import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisteredPurchases() {
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://bazar-backend-ynxj.onrender.com/sales/')
            .then(response => response.json())
            .then(data => setSales(data));
    }, []);

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Contenido Principal */}
            <main className="flex flex-col items-center py-16 px-4 text-center">
                <h2 className="text-4xl font-extrabold text-pink-500 mb-6">Compras Registradas</h2>

                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sales.map(purchase => (
                        <div
                            key={purchase.id}
                            className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                        >
                            <h3 className="text-xl font-bold text-pink-400 mb-2">Compra #{purchase.id}</h3>
                            <p className="text-gray-400">Fecha: {purchase.fecha}</p>
                            <p className="text-gray-300 font-semibold mt-2">Total: ${purchase.total.toFixed(2)}</p>
                            <div className="mt-4">
                                <h4 className="text-lg font-bold text-pink-500 mb-2">Productos:</h4>
                                {purchase.productos.map(product => (
                                    <div key={product.id} className="flex items-center bg-gray-700 p-4 rounded-md mb-3">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-16 h-16 rounded-md mr-4"
                                        />
                                        <div className="text-left">
                                            <h5 className="font-bold text-white">{product.title}</h5>
                                            <p className="text-gray-300">Cantidad: {product.quantity}</p>
                                            <p className="text-gray-300">Precio: ${product.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleBack}
                    className="mt-8 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
                >
                    Salir
                </button>
            </main>
        </div>
    );
}

export default RegisteredPurchases;
