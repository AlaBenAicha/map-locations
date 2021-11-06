import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Locations</a>
        </Link>
        <Link href="/newLocation">
            <a className="create">Create location</a>
        </Link>
    </nav>
)

export default Navbar;