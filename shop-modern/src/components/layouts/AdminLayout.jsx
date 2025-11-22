import React, { useContext } from 'react';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, Truck, ArrowLeft, LogOut } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const AdminLayout = ({ children }) => {
    const { user, logout } = useContext(ShopContext);
    const navigate = useNavigate();

    if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-64 bg-primary text-white fixed h-full flex flex-col z-50">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold tracking-tighter">LUMOS<span className="text-red-500">ADMIN</span></h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavLink to="/admin" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                        <LayoutDashboard size={20} /> Genel Bakış
                    </NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                        <Package size={20} /> Ürün Yönetimi
                    </NavLink>
                    <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                        <Truck size={20} /> Siparişler
                    </NavLink>
                    <div className="border-t border-gray-800 mt-6 pt-6">
                        <NavLink to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
                            <ArrowLeft size={20} /> Siteye Dön
                        </NavLink>
                    </div>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={() => { logout(); navigate('/login') }} className="flex items-center gap-2 text-red-400 hover:text-red-300 w-full px-4 py-2">
                        <LogOut size={18} /> Çıkış Yap
                    </button>
                </div>
            </div>
            <div className="flex-1 ml-64 p-8">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;