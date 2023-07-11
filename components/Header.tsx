import Link from 'next/link';
import Logo from './Logo';
import Navbar from './Navbar';

const Header = () => {
    return (
            <header className="fixed top-0 w-full h-16 bg-stone-100 text-teal-700 z-10 drop-shadow">
                <nav className="relative flex justify-between items-center h-full w-11/12 sm:max-w-7xl mx-auto">
                    <div>
                        <Link href="/appDir">
                                <Logo />
                        </Link>
                    </div>
                    <Navbar />
                </nav>
            </header>
    );
}

export default Header;