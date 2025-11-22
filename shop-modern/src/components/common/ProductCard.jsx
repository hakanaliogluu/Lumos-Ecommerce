import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const ProductCard = ({ product }) => {
    const { favorites, toggleFavorite } = useContext(ShopContext);
    const isFavorite = favorites.some(fav => fav.id === product.id);

    return (
        <Link to={`/product/${product.id}`}>
            <motion.div whileHover={{ y: -8 }} className="group cursor-pointer relative">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4] mb-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product); }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-all z-10"
                    >
                        <Heart
                            size={20}
                            className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`}
                        />
                    </button>
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-primary">{product.name}</h3>
                        <p className="text-gray-400 text-sm">{product.category}</p>
                    </div>
                    <span className="font-medium text-primary">₺{product.price}</span>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;