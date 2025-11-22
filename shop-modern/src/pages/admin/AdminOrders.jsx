import React, { useContext, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { ChevronDown, ChevronUp, Package, User, Calendar } from 'lucide-react';

const AdminOrders = () => {
    const { orders, updateOrderStatus } = useContext(ShopContext);

    // Hangi siparişin detayının açık olduğunu tutar
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const toggleOrder = (id) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    const statusColors = {
        "Hazırlanıyor": "bg-yellow-100 text-yellow-700 border-yellow-200",
        "Kargolandı": "bg-blue-100 text-blue-700 border-blue-200",
        "Teslim Edildi": "bg-green-100 text-green-700 border-green-200",
        "İptal": "bg-red-100 text-red-700 border-red-200"
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Sipariş Yönetimi</h1>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Üst Kısım (Özet) */}
                        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleOrder(order.id)}>
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                    <Package size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800">Sipariş #{order.id}</h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(order.date).toLocaleDateString('tr-TR')}</span>
                                        <span>•</span>
                                        <span>{order.items?.length || 0} Ürün</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right mr-4">
                                    <p className="text-xs text-gray-500 uppercase font-bold">Toplam Tutar</p>
                                    <p className="font-bold text-xl text-primary">₺{order.total}</p>
                                </div>

                                {/* Durum Güncelleme (stopPropagation ile tıklamayı engelle) */}
                                <div onClick={(e) => e.stopPropagation()}>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold border focus:ring-2 focus:ring-offset-1 outline-none cursor-pointer transition-all ${statusColors[order.status] || "bg-gray-100 border-gray-200"}`}
                                    >
                                        <option value="Hazırlanıyor">Hazırlanıyor</option>
                                        <option value="Kargolandı">Kargolandı</option>
                                        <option value="Teslim Edildi">Teslim Edildi</option>
                                        <option value="İptal">İptal</option>
                                    </select>
                                </div>

                                {expandedOrderId === order.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                            </div>
                        </div>

                        {/* Alt Kısım (Detaylar - Açılır Kapanır) */}
                        {expandedOrderId === order.id && (
                            <div className="bg-gray-50 p-6 border-t border-gray-100 animate-in slide-in-from-top-2">
                                <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                    <Package size={18} /> Ürün Listesi
                                </h4>
                                <div className="grid gap-4">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
                                            <div className="flex items-center gap-4">
                                                {/* DÜZELTME: item.productImage kullanıldı */}
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                                                    <img
                                                        src={item.productImage || item.image || "https://via.placeholder.com/100"}
                                                        className="w-full h-full object-cover"
                                                        alt={item.productName}
                                                    />
                                                </div>
                                                <div>
                                                    {/* DÜZELTME: item.productName kullanıldı */}
                                                    <p className="font-bold text-gray-800">{item.productName || item.name}</p>
                                                    <p className="text-sm text-gray-500">Adet: {item.quantity || 1}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-primary">₺{item.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {orders.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Henüz Sipariş Yok</h3>
                        <p className="text-gray-500">Gelen siparişler burada listelenecektir.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;