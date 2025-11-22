import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const ProductDetail = () => {
    const { products, addToCart, favorites, toggleFavorite } = useContext(ShopContext);
    const navigate = useNavigate();
    const { id: paramId } = useParams();
    const product = products.find(p => p.id === parseInt(paramId));

    if (!product) return <div className="pt-32 text-center">Ürün bulunamadı.</div>;

    const isFavorite = favorites.some(fav => fav.id === product.id);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary mb-8 gap-2">
                <ArrowLeft size={20} /> Geri Dön
            </button>
            <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-gray-100 rounded-3xl overflow-hidden h-[500px] shadow-lg">
                    <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2">{product.category}</span>
                    <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>
                    <p className="text-3xl font-bold text-primary mb-6">₺{product.price}</p>
                    <p className="text-gray-600 text-lg mb-8">{product.description}</p>
                    <div className="flex gap-4">
                        <button onClick={() => addToCart(product)} className="flex-1 bg-primary text-white py-4 rounded-xl font-bold hover:bg-gray-800 flex items-center justify-center gap-2">
                            <ShoppingBag size={20} /> Sepete Ekle
                        </button>
                        <button onClick={() => toggleFavorite(product)} className={`p-4 border-2 rounded-xl transition-colors ${isFavorite ? "border-red-500 text-red-500 bg-red-50" : "border-gray-200 hover:border-red-500 hover:text-red-500"}`}>
                            <Heart className={isFavorite ? "fill-red-500" : ""} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetail;