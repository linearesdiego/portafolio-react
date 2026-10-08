import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PROJECTS } from '../data/data'

export const Projects = () => {
    const [openId, setOpenId] = useState(PROJECTS[0].id)
    const activeProject = PROJECTS.find((project) => project.id === openId)

    return (
        <div className="flex h-full flex-col">
            <header className="flex items-start justify-between">
                <h2 id="projects-title" className="text-lg font-medium">Proyectos</h2>
            </header>

            <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl bg-(--ink)/10">
                {activeProject && (
                    <img
                        key={activeProject.id}
                        src={activeProject.imagen}
                        alt={`Captura del proyecto ${activeProject.titulo}`}
                        width={activeProject.ancho}
                        height={activeProject.alto}
                        className="h-full w-full animate-[fadeIn_0.3s_ease-in-out] object-cover"
                    />
                )}
            </div>

            <ul className="mt-4 flex-1 overflow-y-auto">
                {PROJECTS.map((project) => {
                    const isOpen = project.id === openId
                    const panelId = `project-panel-${project.id}`

                    return (
                        <li key={project.id} className="border-t border-(--ink)/10 first:border-t-0">
                            <button
                                type="button"
                                onClick={() => setOpenId(project.id)}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                className="flex w-full items-center justify-between py-2 text-left text-sm font-medium"
                            >
                                {project.titulo}
                                <ChevronDown
                                    aria-hidden="true"
                                    className={`h-4 w-4 shrink-0 transition-transform cursor-pointer ${isOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            <div
                                id={panelId}
                                inert={!isOpen}
                                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <div
                                        className={`pb-3 text-xs text-(--muted) transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
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
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-block font-medium underline underline-offset-2"
                                        >
                                            Ver proyecto <span aria-hidden="true">↗</span>
                                            <span className="sr-only"> {project.titulo} (se abre en una pestaña nueva)</span>
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
