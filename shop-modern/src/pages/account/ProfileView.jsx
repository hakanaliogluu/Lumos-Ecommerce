import React, { useContext, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const ProfileView = () => {
    const { user, updateUserData } = useContext(ShopContext);
    const [formData, setFormData] = useState({ name: user.name, email: user.email, phone: user.phone || "" });
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserData({ ...user, ...formData });
        setMessage("Profil bilgileriniz başarıyla güncellendi.");
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <div className="max-w-lg">
            <h2 className="text-2xl font-bold mb-6">Kişisel Bilgiler</h2>
            {message && (<div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2"><CheckCircle size={16} />{message}</div>)}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm font-bold text-gray-700 block mb-1">Ad Soyad</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-50 p-3 rounded-xl border-transparent focus:border-accent focus:ring-0" /></div>
                    <div><label className="text-sm font-bold text-gray-700 block mb-1">Telefon</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-gray-50 p-3 rounded-xl border-transparent focus:border-accent focus:ring-0" /></div>
                </div>
                <div><label className="text-sm font-bold text-gray-700 block mb-1">E-posta</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-gray-50 p-3 rounded-xl border-transparent focus:border-accent focus:ring-0" /></div>
                <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors mt-4">Güncelle</button>
            </form>
        </div>
    );
};

export default ProfileView;