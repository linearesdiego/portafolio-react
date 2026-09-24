/**
 * LlmAvatarAssistant.jsx
 *
 * Fixed bottom-right chat widget: a round toggle button that opens/closes a
 * chat panel (speech bubble + question input).
 *
 * Config (see DEFAULT_CONFIG) covers the llama.cpp / OpenAI-compatible
 * endpoint, model, key, the default text, and how sections are discovered
 * for auto-scroll.
 */
import {
  useState, useRef, useEffect, useMemo, useCallback,
} from 'react';
import { Bot, X } from 'lucide-react';
import { createLlmClient, normalizeLlmConfig } from './llmClient.js';
import { collectSections, findSectionReference, scrollToSection } from './sectionScanner.js';
import { displayMarkdown } from './utils.js';

const DEFAULT_CONFIG = {
  baseUrl: '/v1',                  // same-origin dev proxy -> llama.cpp
  apiKey: '',
  model: 'default',
  temperature: 0.7,
  defaultText: 'Hi! I live on this page. Ask me anything about it.',
  modelUrl: 'models/robot.glb',
  side: 'right',                  // right | left
  corner: null,                   // null | 'bottom-left' | 'bottom-right'
  maxBubbleHeight: 240,
  sectionDiscovery: 'auto',       // 'auto' | explicit list of {id,title,aliases[]}
  systemPrompt:
    'You are a friendly assistant embedded in a personal portfolio page. ' +
    'The "On-page sections" list below is the real content of the page — ' +
    'use it to answer questions about the portfolio owner (background, ' +
    'skills, projects, contact info) accurately. Do not invent facts that ' +
    'are not present in that content. Reply in the same language the user ' +
    'wrote in (default to Spanish). Answer concisely (2–4 sentences). ' +
    'When relevant, mention ONE of the on-page sections by its exact title ' +
    'so the user can be taken there. Do not invent sections.',
  streaming: true,
};

export { DEFAULT_CONFIG };

export default function LlmAvatarAssistant({
  config = {},
  onScrollToSection,      // optional escape hatch: (section) => void
  onSend,                 // optional: (question, response) => void
}) {
  const cfg = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => [
    { id: 'greeting', role: 'assistant', text: cfg.defaultText, matchedSection: null },
  ]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const bubbleRef = useRef(null);
  const inputRef = useRef(null);
  const clientRef = useRef(null);
  const sectionsRef = useRef([]);
  const nextIdRef = useRef(1);

  // Build the client once per config change.
  useEffect(() => {
    const res = normalizeLlmConfig(cfg);
    if (!res.ok) {
      setError(res.error);
      clientRef.current = null;
      return;
    }
    clientRef.current = createLlmClient({
      baseUrl: res.value.baseUrl,
      apiKey: res.value.apiKey,
      model: res.value.model,
      timeoutMs: cfg.timeoutMs,
      extra: { temperature: res.value.temperature },
    });
    setError('');
  }, [cfg]);

  // (Re)discover sections on mount and on config change.
  useEffect(() => {
    const list = collectSections(document, cfg.sectionDiscovery === 'auto' ? null : cfg.sectionDiscovery);
    sectionsRef.current = list;
  }, [cfg.sectionDiscovery]);

  // Keep the message list pinned to the newest text while the model streams.
  const stickToBottom = useRef(true);
  useEffect(() => {
    const el = bubbleRef.current;
    if (!el) return;
    if (stickToBottom.current) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  const handleBubbleScroll = useCallback(() => {
    const el = bubbleRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
    stickToBottom.current = atBottom;
  }, []);

  const performScroll = useCallback((section) => {
    const ok = scrollToSection(section.id, { behavior: 'smooth', offset: 64 });
    if (onScrollToSection && ok) onScrollToSection(section);
  }, [onScrollToSection]);

  const updateAssistantMessage = useCallback((id, patch) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }, []);

  const ask = useCallback(async (text) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    const client = clientRef.current;
    if (!client) {
      setError(client ? error : 'The assistant is not configured. Set a valid base URL.');
      return;
    }

    setError('');
    setBusy(true);
    setInput('');
    stickToBottom.current = true;

    // Show the question as a sent message right away, and a placeholder for
    // the reply that fills in as the model streams.
    const assistantId = `assistant-${nextIdRef.current++}`;
    setMessages((prev) => [
      ...prev,
      { id: `user-${nextIdRef.current++}`, role: 'user', text: q },
      { id: assistantId, role: 'assistant', text: '', matchedSection: null },
    ]);

    // Give the model enough context about the page so it can reference
    // sections meaningfully (this is what makes the auto-scroll testable).
    const pageContext = sectionsRef.current
      .map((s) => `- ${s.title} (id: ${s.id})${s.text ? `: ${s.text}` : ''}`)
      .join('\n');
    const payload = [
      { role: 'system', content: cfg.systemPrompt + (pageContext ? `\n\nOn-page sections:\n${pageContext}` : '') },
      { role: 'user', content: q },
    ];

    let full = '';
    try {
      if (cfg.streaming) {
        full = await client.chatStream(
          payload,
          (token, cur) => updateAssistantMessage(assistantId, { text: cur }),
        );
      } else {
        full = await client.chat(payload);
        updateAssistantMessage(assistantId, { text: full });
      }
      if (!full) updateAssistantMessage(assistantId, { text: '(empty response)' });

      // Scan the final answer for a section reference and scroll there.
      const ref = findSectionReference(full, sectionsRef.current);
      if (ref) {
        updateAssistantMessage(assistantId, { matchedSection: ref.section });
        performScroll(ref.section);
      }
      if (onSend) onSend(q, full);
    } catch (err) {
      setError(err?.message || 'The model request failed.');
    } finally {
      setBusy(false);
    }
  }, [input, busy, cfg, error, performScroll, updateAssistantMessage, onSend]);

  const submit = (e) => {
    if (e) e.preventDefault();
    ask();
  };

  return (
    <div
      className="lav-root fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      data-testid="lav-root"
      role="region"
      aria-label="AI assistant"
    >
      {isOpen && (
        <div className="w-80 max-w-[90vw] flex flex-col gap-3 rounded-2xl border border-white/10 bg-(--card-2) p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-(--ink)">Asistente</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar asistente"
              className="rounded-full p-1 text-(--muted) hover:text-(--ink)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Message list */}
          <div
            ref={bubbleRef}
            className="lav-bubble flex flex-col gap-2 overflow-y-auto"
            data-testid="lav-bubble"
            onScroll={handleBubbleScroll}
            style={{ maxHeight: cfg.maxBubbleHeight }}
            aria-live="polite"
          >
            {messages.map((m, idx) => {
              const isLast = idx === messages.length - 1;
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  data-testid="lav-message"
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    isUser
                      ? 'self-end bg-(--card-accent) text-white'
                      : 'self-start bg-(--bg-primary) text-(--ink)'
                  }`}
                >
                  {isUser
                    ? m.text
                    : renderResponse(m.text, busy && isLast, m.matchedSection, performScroll)}
                </div>
              );
            })}
          </div>

          {/* Question input */}
          <form className="lav-input-row flex items-center gap-2" onSubmit={submit}>
            <input
              ref={inputRef}
              className="lav-input flex-1 rounded-full bg-(--bg-primary) px-3 py-2 text-sm text-(--ink) outline-none"
              data-testid="lav-input"
              value={input}
              placeholder="Preguntá algo…"
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
              aria-label="Ask the assistant"
            />
            <button
              className="lav-send flex items-center justify-center rounded-full bg-(--card-accent) px-4 py-2 text-sm text-white disabled:opacity-50"
              data-testid="lav-send"
              type="submit"
              disabled={busy || !input.trim()}
            >
              {busy ? '…' : 'Ask'}
            </button>
          </form>

          {error && (
            <div className="lav-error text-sm text-red-400" data-testid="lav-error" role="alert">{error}</div>
          )}
        </div>
      )}

      {/* Floating toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-(--card-accent) text-white shadow-lg transition hover:scale-105"
      >
        <Bot size={26} />
      </button>
    </div>
  );
}

/**
 * Render the response, turning any referenced section title into an inline
 * clickable highlight (so the auto-scroll is visible to the user too).
 * Falls back to plain text with no matched section.
 */
function renderResponse(text, typing, matchedSection, performScroll) {
  const body = typing && !text ? '…' : displayMarkdown(text) || '…';
  if (!matchedSection) {
    return <span data-testid="lav-response-text">{body}</span>;
  }
  // Highlight the first occurrence of the matched section's title/alias.
  const title = matchedSection.title;
  const lower = body.toLowerCase();
  const tLower = (title || '').toLowerCase();
  const at = tLower ? lower.indexOf(tLower) : -1;
  if (at === -1) return <span data-testid="lav-response-text">{body}</span>;
  return (
    <span data-testid="lav-response-text">
      {body.slice(0, at)}
      <span
        className="lav-bubble-section-link"
        data-testid="lav-section-link"
        onClick={() => performScroll(matchedSection)}
        title={`Go to ${title}`}
      >
        {body.slice(at, at + (title || '').length)}
      </span>
      {body.slice(at + (title || '').length)}
    </span>
  );
}
