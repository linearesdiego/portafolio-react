import { Download, MapPin } from 'lucide-react'
import javascript from '../assets/icons/icon-javascrip.png'
import react from '../assets/icons/icon-react.png'
import cv from '../assets/pdf/cv-DiegoLineares.pdf'

export const Hero = () => {
    return (
        <div className="w-full">
            <div className="absolute top-4 left-4 flex gap-3">
                <img src={javascript} alt="logo javascrip" className="h-12 w-12 opacity-40" />
                <img src={react} alt="logo react" className="h-12 w-12 opacity-80" />
            </div>

            <a
                href={cv}
                download="cv-DiegoLineares.pdf"
                className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
                <Download className="h-4 w-4" />
                Descargar CV
            </a>

            <p className="flex items-center gap-3 text-2xl font-semibold">
                Hola, soy Diego
                <span className="inline-block animate-[wave_2s_ease-in-out_infinite] origin-[70%_70%] text-4xl">
                    👋
                </span>
            </p>

            <h1 className="mt-1 text-4xl font-extrabold leading-tight">
                <span className="font-light italic">Ssr</span> FrontEnd Developer
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-(--ink)">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                Disponible para nuevos proyectos
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-(--ink)">
                <MapPin className="h-4 w-4" />
                San Juan, Argentina
            </div>
        </div>
    )
}
