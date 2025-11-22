import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../../context/ShopContext';
import ProductCard from '../../components/common/ProductCard';
import { Filter, X, SlidersHorizontal } from 'lucide-react';

const CategoryPage = () => {
    const { type } = useParams();
    const { products } = useContext(ShopContext);

    const [showFilter, setShowFilter] = useState(false);

    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 10000,
        categories: []
    });

    let initialProducts = products;

    if (type) {
        initialProducts = products.filter(p => p.gender === type || p.gender === 'unisex');
    }

    const filteredProducts = initialProducts.filter(p => {
        const priceMatch = p.price >= filters.minPrice && p.price <= filters.maxPrice;
        const catMatch = filters.categories.length === 0 || filters.categories.includes(p.category);
        return priceMatch && catMatch;
    });

    const categories = [...new Set(products.map(p => p.category))];

    const getCategoryInfo = () => {
        if (type === 'erkek') return { title: "Erkek Koleksiyonu", img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1600", color: "from-blue-900" };
        if (type === 'kadin') return { title: "Kadın Koleksiyonu", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600", color: "from-purple-900" };
        return { title: "Tüm Ürünler", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600", color: "from-gray-900" };
    };
    const info = getCategoryInfo();

    const handleCatChange = (cat) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };

    return (
        <div className="min-h-screen relative">
            {type && (
                <div className="relative h-[300px] overflow-hidden">
                    <img src={info.img} className="absolute inset-0 w-full h-full object-cover" alt={info.title} />
                    <div className={`absolute inset-0 bg-gradient-to-r ${info.color} to-transparent opacity-90`} />
                    <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
                        <h1 className="text-5xl font-bold text-white">{info.title}</h1>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* DEĞİŞİKLİK BURADA YAPILDI:
                    Eski hali: sticky top-24 bg-white/80 backdrop-blur-md ...
                    Yeni hali: bg-white ... (sticky ve top-24 kaldırıldı)
                */}
                <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 font-medium"><span className="text-primary font-bold">{filteredProducts.length}</span> ürün listeleniyor</p>
                    <button onClick={() => setShowFilter(true)} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg font-bold text-gray-700 hover:bg-gray-200 transition-colors">
                        <SlidersHorizontal size={18} /> Filtrele
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((p, i) => (
                        <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <ProductCard product={p} />
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showFilter && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilter(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl p-6 overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold">Filtreler</h3>
                                <button onClick={() => setShowFilter(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
                            </div>

                            <div className="mb-8">
                                <h4 className="font-bold text-sm uppercase text-gray-500 mb-4">Fiyat Aralığı</h4>
                                <div className="flex items-center gap-3">
                                    <input type="number" value={filters.minPrice} onChange={e => setFilters({ ...filters, minPrice: Number(e.target.value) })} className="w-full bg-gray-50 p-2 rounded-lg border text-center" />
                                    <span>-</span>
                                    <input type="number" value={filters.maxPrice} onChange={e => setFilters({ ...filters, maxPrice: Number(e.target.value) })} className="w-full bg-gray-50 p-2 rounded-lg border text-center" />
                                </div>
                            </div>

                            <div className="mb-8">
                                <h4 className="font-bold text-sm uppercase text-gray-500 mb-4">Kategoriler</h4>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.categories.includes(cat) ? "bg-primary border-primary" : "border-gray-300 group-hover:border-primary"}`}>
                                                {filters.categories.includes(cat) && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <input type="checkbox" className="hidden" onChange={() => handleCatChange(cat)} checked={filters.categories.includes(cat)} />
                                            <span className="text-gray-700">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button onClick={() => setFilters({ minPrice: 0, maxPrice: 10000, categories: [] })} className="w-full py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">Filtreleri Temizle</button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategoryPage;