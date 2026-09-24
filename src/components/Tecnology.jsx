import javascript from '../assets/icons/javascript.svg'
import typescript from '../assets/icons/typescript.svg'
import react from '../assets/icons/react.svg'
import nextjs from '../assets/icons/nextjs.svg'
import nodejs from '../assets/icons/nodejs.svg'
import tailwind from '../assets/icons/tailwind.svg'
import git from '../assets/icons/git.svg'
import astro from '../assets/icons/astro.svg'
import postman from '../assets/icons/postman.svg'

const TECNOLOGIAS = [
    { nombre: 'Javascript', icon: javascript },
    { nombre: 'Typescript', icon: typescript },
    { nombre: 'React', icon: react },
    { nombre: 'Next js', icon: nextjs },
    { nombre: 'Node js', icon: nodejs },
    { nombre: 'Tailwind css', icon: tailwind },
    { nombre: 'Git', icon: git },
    { nombre: 'Astro', icon: astro },
    { nombre: 'Postman', icon: postman },
]

export const Tecnology = () => {
    return (
        <div className="flex w-full flex-col gap-3">
            <h2 className="text-2xl font-medium md:text-xl">Tecnologías y herramientas</h2>

            <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-3">
                {TECNOLOGIAS.map(({ nombre, icon }) => (
                    <img
                        key={nombre}
                        src={icon}
                        alt={nombre}
                        title={nombre}
                        className="h-6 w-6 shrink-0"
                    />
                ))}
            </div>
        </div>
    )
}
