import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Cambiar la URL a tu API backend
        fetch('https://bazar-backend-ynxj.onrender.com/products') // Asegúrate de que esta URL sea la correcta
            .then(response => response.json())
            .then(data => {
                console.log('Datos', data);
                setProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleSearch = () => {
        if (query) {
            navigate(`/items?search=${query}`);
        }
    };

    const filteredProducts = products.filter(
        product =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Contenido Principal */}
            <main className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2331/2331983.png"
                        alt="Tienda Online"
                        className="w-48 h-48 mx-auto"
                    />
                </div>

                <h2 className="text-4xl font-extrabold text-pink-500 mb-4">Jonny´s Bazar</h2>
                <p className="text-lg text-gray-300 mb-8">
                    Bazar donde encuentras todo lo que quieras en productos de belleza y un poco más.
                </p>

                {/* Caja de Búsqueda */}
                <div className="flex items-center w-full max-w-md mb-8">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Buscar"
                        className="flex-grow p-3 rounded-l-md border border-gray-300 text-gray-800"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-pink-500 text-white px-4 py-3 rounded-r-md hover:bg-pink-600"
                    >
                        Buscar
                    </button>
                </div>

                {/* Lista de productos */}
                <div className="w-full flex flex-wrap justify-center">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="p-4 md:w-1/3">
                            <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                                <img
                                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                                    src={product.thumbnail}
                                    alt={product.title}
                                />
                                <div className="p-6">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                                        {product.category}
                                    </h2>
                                    <h1 className="title-font text-lg font-medium text-white mb-3">{product.title}</h1>
                                    <p className="leading-relaxed mb-3">{product.description}</p>
                                    <div className="flex items-center flex-wrap">
                                        <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                                            {product.price} USD
                                        </span>
                                        <button>Carrito</button>
                                        <button
                                            onClick={() => navigate(`/products/${product.id}`)}
                                            className="text-pink-500 hover:text-pink-600 ml-auto"
                                        >
                                            Ver detalle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Home;
