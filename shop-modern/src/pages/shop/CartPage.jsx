import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, CheckCircle } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const CartPage = () => {
    const { cart, removeFromCart } = useContext(ShopContext);
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const shipping = subtotal > 5000 ? 0 : 150;
    const total = subtotal + shipping;

    if (cart.length === 0) return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
            <ShoppingBag size={64} className="text-gray-200 mb-6" />
            <h2 className="text-2xl font-bold mb-2">Sepetiniz Boş</h2>
            <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">Alışverişe Başla</Link>
        </div>
    );

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Alışveriş Sepetim ({cart.length})</h1>
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item, index) => (
                        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={`${item.id}-${index}`} className="flex gap-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div className="flex justify-between items-start">
                                    <div><h3 className="font-bold text-lg">{item.name}</h3><p className="text-gray-500 text-sm">{item.category}</p></div>
                                    <button onClick={() => removeFromCart(index)} className="text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-sm text-green-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> Stokta</span>
                                    <span className="font-bold text-xl">₺{item.price}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Sipariş Özeti</h3>
                        <div className="space-y-4 text-gray-600 mb-6">
                            <div className="flex justify-between"><span>Ara Toplam</span><span>₺{subtotal}</span></div>
                            <div className="flex justify-between"><span>Kargo</span><span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "Ücretsiz" : `₺${shipping}`}</span></div>
                            <div className="h-px bg-gray-100 my-4" />
                            <div className="flex justify-between text-primary font-bold text-xl"><span>Toplam</span><span>₺{total}</span></div>
                        </div>
                        <Link to="/checkout" className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold hover:bg-gray-800">Ödemeye Geç</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;