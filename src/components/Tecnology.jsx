import { TECNOLOGIAS } from "../data/data"




export const Tecnology = () => {
    return (
        <div className="flex w-full flex-col gap-3">
            <h2 id="tecnology-title" className="text-2xl font-medium md:text-xl">Tecnologías y herramientas</h2>

            <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-3">
                {TECNOLOGIAS.map(({ nombre, icon }) => (
                    <img
                        key={nombre}
                        src={icon}
                        alt={nombre}
                        title={nombre}
                        width={24}
                        height={24}
                        className="h-6 w-6 shrink-0"
                    />
                ))}
            </div>
        </div>
    )
}
