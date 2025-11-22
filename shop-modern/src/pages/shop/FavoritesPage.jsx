import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import ProductCard from '../../components/common/ProductCard';

const FavoritesPage = () => {
    const { favorites } = useContext(ShopContext);
    return (
        <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Favorilerim ({favorites.length})</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {favorites.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </div>
    );
};

export default FavoritesPage;