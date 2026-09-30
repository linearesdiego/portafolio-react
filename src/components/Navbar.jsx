
export const Navbar = () => {

    return (
        <nav className="w-full bg-(--color-primary) rounded-[20px] flex justify-between items-center h-20 p-5">
            <p className="text-2xl font-bold">{'</> Diego Lineares'}</p>
            <ul className="flex gap-4">
                <li><a href="#projects">Proyectos</a></li>
                <li><a href="#about">Sobre mí</a></li>
                <li><a href="#contact">Contacto</a></li>
            </ul>
        </nav>
    )
}
