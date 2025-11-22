import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, User, Lock } from 'lucide-react';

const AccountDashboard = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Hesabınıza Genel Bakış</h2>
        <div className="grid md:grid-cols-2 gap-6">
            <Link to="/account/orders" className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><ShoppingBag size={24} /></div>
                <h3 className="text-xl font-bold text-primary mb-2">Siparişlerim</h3><p className="text-gray-500 text-sm">Mevcut sipariş durumlarını kontrol et.</p>
            </Link>
            <Link to="/account/addresses" className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><MapPin size={24} /></div>
                <h3 className="text-xl font-bold text-primary mb-2">Adreslerim</h3><p className="text-gray-500 text-sm">Teslimat adreslerini yönet.</p>
            </Link>
            <Link to="/account/profile" className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><User size={24} /></div>
                <h3 className="text-xl font-bold text-primary mb-2">Kişisel Bilgiler</h3><p className="text-gray-500 text-sm">Bilgilerini güncelle.</p>
            </Link>
            <Link to="/account/password" className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><Lock size={24} /></div>
                <h3 className="text-xl font-bold text-primary mb-2">Şifre Değiştir</h3><p className="text-gray-500 text-sm">Hesap güvenliğini sağla.</p>
            </Link>
        </div>
    </div>
);

export default AccountDashboard;