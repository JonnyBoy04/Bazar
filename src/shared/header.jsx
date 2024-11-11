const Header = () => {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-gray-800">
            <div className="flex items-center space-x-2">
                <img src="https://cdn-icons-png.flaticon.com/512/2331/2331983.png" alt="Logo" className="w-8 h-8" />
                <h1 className="text-2xl font-bold text-pink-400">JONNY INC.</h1>
            </div>
            <nav className="space-x-4">
                <a href="/" className="text-gray-300 hover:text-white">
                    Inicio
                </a>
                <a href="/sales" className="text-gray-300 hover:text-white">
                    Ventas
                </a>
            </nav>
        </header>
    );
};

export default Header;
