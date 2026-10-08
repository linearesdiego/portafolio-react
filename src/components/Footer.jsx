import { GithubIcon, LinkedinIcon } from './icons/SocialIcons'

const SOCIALS = [
    { name: 'GitHub', href: 'https://github.com/linearesdiego', Icon: GithubIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/diego-lineares-40576b215/', Icon: LinkedinIcon },
]

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <div className="flex w-full flex-col gap-6 rounded-[20px] bg-(--color-primary) p-6 sm:gap-4">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="text-xl font-bold text-white">{'<DL/>'} Diego Lineares</p>
                    <p className="mt-1 text-xs text-white">FrontEnd Developer · San Juan, Argentina</p>
                </div>

                <div className="flex items-center gap-5">
                    {SOCIALS.map(({ name, href, Icon }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${name} (se abre en una pestaña nueva)`}
                            title={`${name} (se abre en una pestaña nueva)`}
                            className="text-white transition-transform hover:scale-110"
                        >
                            <Icon className="h-5 w-5" />
                        </a>
                    ))}
                </div>
            </div>

            <div className="border-t border-white/15 pt-4">
                <p className="text-xs text-white">
                    © {year} Diego Lineares. Diseño y desarrollo propio.
                </p>
            </div>
        </div>
    )
}
