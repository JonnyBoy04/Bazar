import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://bazar-backend-ynxj.onrender.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id]);

    const generarIdAleatorio = () => {
        return Math.random().toString(36).substring(2, 15); // Genera un ID aleatorio
    };

    const handlePurchase = async () => {
        const compra = {
            id: uuidv4(),
            fecha: new Date().toLocaleString(),
            total: product.price,
            productos: [
                {
                    id: generarIdAleatorio(),
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.images[0],
                    description: product.description,
                    quantity: product.stock,
                },
            ],
        };

        console.log('Datos compra: ', compra);

        const response = await fetch('https://bazar-backend-ynxj.onrender.com/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(compra),
        });

        if (response.ok) {
            navigate('/sales');
        }
    };

    if (!product) return <div className="text-center text-white">Loading...</div>;

    return (
        <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                        alt={product.title}
                        className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-700"
                        src={product.thumbnail}
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
                        <h1 className="text-white text-3xl title-font font-medium mb-1">{product.title}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {/* Puedes agregar íconos o ratings aquí si es necesario */}
                            </span>
                        </div>
                        <p className="leading-relaxed">{product.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                            <div className="flex items-center">
                                <span className="mr-3 text-gray-400">Precio:</span>
                                <span className="title-font font-medium text-2xl text-white">${product.price}</span>
                            </div>
                        </div>
                        <div className="flex">
                            <button
                                onClick={handlePurchase}
                                className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                            >
                                Comprar
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="flex ml-4 text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;
