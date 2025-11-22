import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const AccountLayout = ({ children }) => {
    const { user, logout } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-wrap items-center justify-between mb-10 pb-6 border-b border-gray-100 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-primary border-2 border-white shadow-sm">
                        <User size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-primary">Merhaba, {user.name}</h1>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors font-medium text-sm"
                >
                    <LogOut size={18} /> Çıkış Yap
                </button>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default AccountLayout;