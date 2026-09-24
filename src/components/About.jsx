
export const About = () => {
    return (
        <>
            {/* icono chico (placeholder) */}
            <svg
                className="h-6 w-6 opacity-40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
            >
                <path d="M12 3a9 9 0 1 0 9 9 6 6 0 1 1-6-6 3 3 0 1 0 3 3" />
            </svg>

            <h2 className="text-lg font-bold text-(--ink)">Sobre mí</h2>

            <p className="text-base leading-relaxed font-medium text-(--ink)">
                Soy un estudiante de Tecnología en Desarrollo Web con más de dos años de experiencia trabajando como programador Front-End. Durante este tiempo, he tenido la oportunidad de aprender y aplicar mis conocimientos en la creación de sitios web atractivos y funcionales. Mi objetivo es seguir creciendo en mi carrera, combinar mi formación académica con mi experiencia laboral, y contribuir a proyectos web emocionantes y desafiantes.
            </p>
        </>
    )
}
