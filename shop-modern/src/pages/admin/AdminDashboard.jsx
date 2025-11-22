import React, { useContext } from 'react';
import { DollarSign, Truck, Package } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const AdminDashboard = () => {
    const { products, orders } = useContext(ShopContext);
    const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Yönetim Paneli</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><DollarSign size={28} /></div>
                    <div><p className="text-gray-500 text-sm">Toplam Ciro</p><h3 className="text-2xl font-bold text-gray-800">₺{totalSales.toLocaleString()}</h3></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Truck size={28} /></div>
                    <div><p className="text-gray-500 text-sm">Toplam Sipariş</p><h3 className="text-2xl font-bold text-gray-800">{orders.length}</h3></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-4">
                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><Package size={28} /></div>
                    <div><p className="text-gray-500 text-sm">Aktif Ürünler</p><h3 className="text-2xl font-bold text-gray-800">{products.length}</h3></div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;