
export const Navbar = () => {

    return (
        <nav className="w-full bg-(--color-primary) rounded-[20px] flex justify-between items-center h-20 p-5">
            <h1 className="text-2xl font-bold">{'</> Diego Lineares'}</h1>
            <ul className="flex gap-4">
                <li><a href="#projects">Proyectos</a></li>
                <li><a href="#about">Sobre mí</a></li>
                <li><a href="#contact">Contacto</a></li>
            </ul>
        </nav>
    )
}
