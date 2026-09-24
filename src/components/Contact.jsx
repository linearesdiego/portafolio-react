import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons'

const EMAIL = 'diegolineares@gmail.com'

const SOCIALS = [
    { name: 'GitHub', href: 'https://github.com/linearesdiego', Icon: GithubIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/diego-lineares-40576b215/', Icon: LinkedinIcon },
]

export const Contact = () => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch {
            // clipboard no disponible
        }
    }

    return (
        <>
            <div className="flex items-start justify-between">
                <p className="text-xs">¿Tenés alguna pregunta?</p>
                <span aria-hidden="true">↗</span>
            </div>

            <p className="text-3xl font-medium md:text-4xl">Contactame</p>

            <p className="text-sm leading-relaxed">
                No dude en comunicarse conmigo si está buscando un desarrollador, tiene alguna consulta o simplemente desea conectarse.
            </p>

            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{EMAIL}</span>
                <button
                    type="button"
                    onClick={handleCopy}
                    aria-label="Copiar email"
                    title={copied ? 'Copiado' : 'Copiar email'}
                    className="cursor-pointer text-current opacity-70 transition-opacity hover:opacity-100"
                >
                    {copied ? (
                        <Check className="h-4 w-4" strokeWidth={2} />
                    ) : (
                        <Copy className="h-4 w-4" strokeWidth={2} />
                    )}
                </button>
            </div>

            <div className="flex items-center gap-3">
                {SOCIALS.map(({ name, href, Icon }) => (
                    <a
                        key={name}
                        href={href}
                        aria-label={name}
                        target="_blank"
                        title={name}
                        className="opacity-80 transition-opacity hover:opacity-100"
                    >
                        <Icon className="h-5 w-5" />
                    </a>
                ))}
            </div>
        </>
    )
}
