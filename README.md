# Portafolio — Diego Lineares

Portafolio personal en formato *bento grid* (Hero, Retrato, Proyectos, Sobre mí, Contacto y Tecnologías) con un asistente de chat embebido que responde preguntas sobre el contenido de la página y hace scroll automático a la sección relevante.

## Stack

- [React 19](https://react.dev) + [Vite 8](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (plugin `@tailwindcss/vite`)
- [lucide-react](https://lucide.dev) para íconos
- [Oxlint](https://oxc.rs) como linter

## Scripts

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # servir el build localmente
npm run lint     # correr oxlint
```

## Estructura

```
src/
├── App.jsx                     # layout del bento grid
├── index.css                   # tokens de color, fuentes y colocación del grid
└── components/
    ├── Hero, Me, Projects, About, Contact, Tecnology, Navbar, Footer
    ├── CardContainer.jsx       # card genérica del grid
    └── LlmAvatarAssistant/     # widget de chat
        ├── LlmAvatarAssistant.jsx
        ├── llmClient.js        # cliente OpenAI-compatible con streaming SSE
        ├── sectionScanner.js   # detecta secciones y hace scroll
        └── utils.js
```

## Asistente LLM

El asistente habla con cualquier servidor compatible con la API de OpenAI (por ejemplo [llama.cpp](https://github.com/ggml-org/llama.cpp) con `llama-server`). En desarrollo, Vite hace proxy de `/v1` hacia ese servidor.

1. Levantar el backend, por ejemplo:

   ```bash
   llama-server -m ruta/al/modelo.gguf --port 8080
   ```

2. (Opcional) Crear un archivo `.env` en la raíz para cambiar el destino del proxy:

   | Variable                | Descripción                                          | Default                  |
   |-------------------------|------------------------------------------------------|--------------------------|
   | `VITE_LLM_PROXY_TARGET` | URL del servidor LLM                                 | `http://127.0.0.1:8080`  |
   | `VITE_LLM_PROXY_KEY`    | API key enviada como `Authorization: Bearer <key>`   | *(vacía)*                |

3. Ajustar el nombre del modelo en `ASSISTANT_CONFIG` (`src/App.jsx`).

> El proxy solo existe en `npm run dev`. En un deploy estático el asistente no tiene backend y muestra un mensaje de error; para producción hay que apuntar `baseUrl` a un endpoint accesible públicamente.
