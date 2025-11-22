import React, { useContext, useState } from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const PasswordView = () => {
    const { changePassword } = useContext(ShopContext); // Context'ten fonksiyonu çek

    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        // Basit istemci tarafı doğrulamaları
        if (newPass !== confirmPass) {
            setMessage({ type: "error", text: "Yeni şifreler eşleşmiyor." });
            return;
        }
        if (newPass.length < 6) {
            setMessage({ type: "error", text: "Şifre en az 6 karakter olmalı." });
            return;
        }

        setLoading(true);

        // Backend'e istek at
        const result = await changePassword(currentPass, newPass);

        if (result.success) {
            setMessage({ type: "success", text: result.message });
            setCurrentPass(""); setNewPass(""); setConfirmPass("");
        } else {
            // Backend'den gelen hatayı göster (Örn: "Mevcut şifreniz hatalı")
            setMessage({ type: "error", text: result.message });
        }

        setLoading(false);
    };

    return (
        <div className="max-w-lg">
            <h2 className="text-2xl font-bold mb-6">Şifre Değiştir</h2>

            {message.text && (
                <div className={`p-3 rounded-lg mb-4 text-sm flex items-center gap-2 ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                    {message.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1">Mevcut Şifre</label>
                    <input type="password" required value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} className="w-full bg-gray-50 p-3 rounded-xl border-transparent focus:border-accent focus:ring-0" disabled={loading} />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1">Yeni Şifre</label>
                    <input type="password" required value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full bg-gray-50 p-3 rounded-xl border-transparent focus:border-accent focus:ring-0" disabled={loading} />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-1">Yeni Şifre (Tekrar)</label>
                    <input type="password" required value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="w-full bg-gray-50 p-3 rounded-xl border-transparent focus:border-accent focus:ring-0" disabled={loading} />
                </div>

                <button disabled={loading} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors mt-4 flex items-center gap-2 disabled:opacity-70">
                    {loading && <Loader2 className="animate-spin" size={18} />}
                    Şifreyi Yenile
                </button>
            </form>
        </div>
    );
};

export default PasswordView;