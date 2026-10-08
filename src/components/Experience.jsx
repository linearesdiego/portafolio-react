import { EXPERIENCIA } from '../data/data'

const Fecha = ({ texto, fecha }) =>
    fecha ? <time dateTime={fecha}>{texto}</time> : <span>{texto}</span>

export const Experience = () => {
    return (
        <div className="flex flex-col gap-6">
            <h2 id="experience-title" className="text-lg font-bold text-(--ink)">Experiencia</h2>

            <ol className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
                {EXPERIENCIA.map(({ id, empresa, modalidad, ubicacion, puestos }) => (
                    <li key={id} className="flex flex-col gap-3">
                        <div>
                            <h3 className="text-base font-bold text-(--ink)">{empresa}</h3>
                            <p className="text-xs text-(--muted)">{modalidad} · {ubicacion}</p>
                        </div>

                        <ol className="flex flex-col gap-4 border-l border-(--ink)/15 pl-4">
                            {puestos.map(({ titulo, desde, hasta, tags }) => (
                                <li key={titulo} className="relative">
                                    <span
                                        aria-hidden="true"
                                        className="absolute top-1.5 -left-5.25 h-2.5 w-2.5 rounded-full bg-(--color-primary) ring-4 ring-(--card-1)"
                                    />
                                    <p className="text-sm font-medium text-(--ink)">{titulo}</p>
                                    <p className="text-xs text-(--muted)">
                                        <Fecha {...desde} /> – <Fecha {...hasta} />
                                    </p>

                                    {tags.length > 0 && (
                                        <ul className="mt-2 flex flex-wrap gap-1 text-xs" aria-label="Aptitudes">
                                            {tags.map((tag) => (
                                                <li
                                                    key={tag}
                                                    className="rounded-full bg-(--ink)/10 px-2 py-0.5 font-medium text-(--ink)"
                                                >
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ol>
        </div>
    )
}
