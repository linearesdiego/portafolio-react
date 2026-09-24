import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import proyecto1 from '../assets/proyectos/proyecto1.png'
import proyecto2 from '../assets/proyectos/proyecto2.png'
import proyecto3 from '../assets/proyectos/proyecto3.png'

const PROJECTS = [
    {
        id: 1,
        titulo: 'Instagram Clone',
        descripcion: 'Este proyecto lo realize para presentar en una entrevista tecnica para una empresa de los estados unidos.',
        imagen: proyecto1,
        tecnologias: ['Next JS', 'Javascript', 'Tailwind CSS', 'Zustand', 'Mockapi'],
        link: 'https://next-instagram-buiffhlu1-linearesdiegos-projects.vercel.app/'
    },
    {
        id: 2,
        titulo: 'Ayinco',
        descripcion: 'Este proyecto es un sitio web de una empresa constructura con su responsive y sus formularios de contacto.',
        imagen: proyecto2,
        tecnologias: ['Astro js', 'Typescript', 'Tailwind CSS'],
        link: 'https://www.ayinco.com.ar/'
    },
    {
        id: 3,
        titulo: 'Portafolio v2',
        descripcion: 'Este proyecto es un portafolio que realize hace dos años.',
        imagen: proyecto3,
        tecnologias: ['Astro js', 'Typescript', 'Tailwind CSS'],
        link: 'https://diego-lineares-dev.vercel.app/'
    },
]

export const Projects = () => {
    const [openId, setOpenId] = useState(PROJECTS[0].id)
    const activeProject = PROJECTS.find((project) => project.id === openId)

    return (
        <div className="flex h-full flex-col">
            <header className="flex items-start justify-between">
                <h2 className="text-lg font-medium">Proyectos</h2>
            </header>

            <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl bg-(--ink)/10">
                {activeProject && (
                    <img
                        key={activeProject.id}
                        src={activeProject.imagen}
                        alt={activeProject.titulo}
                        className="h-full w-full animate-[fadeIn_0.3s_ease-in-out] object-cover"
                    />
                )}
            </div>

            <ul className="mt-4 flex-1 overflow-y-auto">
                {PROJECTS.map((project) => {
                    const isOpen = project.id === openId

                    return (
                        <li key={project.id} className="border-t border-(--ink)/10 first:border-t-0">
                            <button
                                type="button"
                                onClick={() => setOpenId(project.id)}
                                className="flex w-full items-center justify-between py-2 text-left text-sm font-medium"
                            >
                                {project.titulo}
                                <ChevronDown
                                    className={`h-4 w-4 shrink-0 transition-transform cursor-pointer ${isOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            <div
                                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <div
                                        className={`pb-3 text-xs text-(--muted) transition-opacity duration-300 ${
                                            isOpen ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <p className="leading-relaxed">{project.descripcion}</p>

                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {project.tecnologias.map((tecnologia) => (
                                                <span
                                                    key={tecnologia}
                                                    className="rounded-full bg-(--ink)/10 px-2 py-0.5 font-medium text-(--ink)"
                                                >
                                                    {tecnologia}
                                                </span>
                                            ))}
                                        </div>

                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-2 inline-block font-medium underline underline-offset-2"
                                        >
                                            Ver proyecto ↗
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
