import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, CheckCircle, ChevronRight } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const OrdersView = () => {
    const { orders } = useContext(ShopContext); // Kullanıcının siparişleri Context'ten gelir

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Sipariş Geçmişi</h2>

            {orders.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border border-dashed border-gray-300">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Henüz bir siparişiniz bulunmuyor.</p>
                    <Link to="/" className="text-accent font-medium mt-2 inline-block hover:underline">Alışverişe Başla</Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                            {/* Header */}
                            <div className="bg-gray-50/50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Sipariş Tarihi</p>
                                        <p className="text-sm font-medium flex items-center gap-1">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(order.date).toLocaleDateString('tr-TR')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Toplam Tutar</p>
                                        <p className="text-sm font-bold text-primary">₺{order.total}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border
                        ${order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-700 border-green-200' :
                                            order.status === 'İptal' ? 'bg-red-100 text-red-700 border-red-200' :
                                                'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                        {order.status === 'Teslim Edildi' && <CheckCircle size={12} />}
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200" title={item.productName}>
                                            {/* DÜZELTME: item.productImage ve item.productName kullanıldı */}
                                            <img
                                                src={item.productImage || item.image || "https://via.placeholder.com/100"}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                alt={item.productName}
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5 truncate px-1 backdrop-blur-sm">
                                                {item.productName || item.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersView;