import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';
import ProductCard from '../../components/common/ProductCard';
import { Link } from 'react-router-dom';

// Kategori Bölümü Bileşeni
const CategorySection = ({ title, products, link }) => {
    if (!products || products.length === 0) return null;

    return (
        <section className="py-10 border-b border-gray-50 last:border-0">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
                    {link && (
                        <Link to={link} className="text-sm font-semibold text-accent hover:text-primary transition-colors flex items-center gap-1 group">
                            Tümünü Gör <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>

                {/* Grid Yapısı */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.slice(0, 4).map(product => ( // İlk 4 ürünü göster
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const HomePage = ({ searchTerm }) => {
    const { products } = useContext(ShopContext);

    // Arama varsa sadece arama sonuçlarını göster
    if (searchTerm) {
        const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return (
            <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen">
                <h2 className="text-2xl font-bold mb-6">"{searchTerm}" için sonuçlar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </div>
        );
    }

    // Kategori Bazlı Filtreleme
    const sportProducts = products.filter(p => p.category === "Spor");
    const clothingProducts = products.filter(p => p.category === "Giyim");
    const accessoryProducts = products.filter(p => p.category === "Aksesuar");
    const shoeProducts = products.filter(p => p.category === "Ayakkabı");

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-20">

            {/* HERO SECTION (Giriş Ekranı) */}
            <section className="relative h-[500px] bg-gray-900 text-white overflow-hidden">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-start">
                    <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                        Yeni Koleksiyon
                    </motion.span>
                    <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Tarzını <br /> Keşfetmeye Başla.
                    </motion.h1>
                    <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="text-lg text-gray-300 mb-8 max-w-md">
                        Lumos 2025 koleksiyonu ile spor, günlük ve şık giyimin en özel parçaları şimdi seninle.
                    </motion.p>
                    <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 transition-all">
                        Alışverişe Başla <ShoppingBag size={20} />
                    </motion.button>
                </div>
            </section>

            {/* KATEGORİ BÖLÜMLERİ */}
            <CategorySection title="Sokak Modası & Giyim" products={clothingProducts} link="/category/erkek" />
            <CategorySection title="Aktif Yaşam & Spor" products={sportProducts} link="/category/kadin" />
            <CategorySection title="Ayakkabı Dünyası" products={shoeProducts} link="/category/kadin" />
            <CategorySection title="Tamamlayıcı Aksesuarlar" products={accessoryProducts} link="/category/unisex" />

        </motion.div>
    );
};

export default HomePage;