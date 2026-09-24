
export const Navbar = () => {

    return (
        <nav className="w-full bg-(--color-primary) rounded-[20px] flex justify-between items-center h-20 p-5">
            <h1 className="text-2xl font-bold">{'</> Diego Lineares'}</h1>
            <ul className="flex gap-4">
                <li><a href="#">Projectos</a></li>
                <li><a href="#">Sobre mi</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </nav>
    )
}
