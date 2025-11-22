import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';
import AuthLayout from '../../components/layouts/AuthLayout';

const RegisterPage = () => {
    const { register } = useContext(ShopContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // UI Durumları
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setIsLoading(true);

        if (name && email && password) {
            try {
                // await ile cevabı bekle
                const result = await register(name, email, password);

                if (result.success) {
                    setSuccessMessage("Hesabınız başarıyla oluşturuldu! Yönlendiriliyorsunuz...");

                    // 1.5 saniye bekle ve Login sayfasına mesaj ile birlikte git
                    setTimeout(() => {
                        navigate("/login", { state: { successMessage: "Kayıt işlemi tamamlandı. Lütfen giriş yapın." } });
                    }, 1500);
                } else {
                    setError(result.message);
                    setIsLoading(false);
                }
            } catch (err) {
                setError("Bir hata oluştu.");
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="Aramıza Katıl" subtitle="Lumos dünyasının ayrıcalıklarından yararlanmak için hesap oluştur." image="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop">

            <AnimatePresence>
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium border border-green-100 shadow-sm"
                    >
                        <CheckCircle size={20} className="text-green-600" />
                        {successMessage}
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium border border-red-100 shadow-sm"
                    >
                        <AlertCircle size={20} className="text-red-600" />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Ad Soyad</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                            placeholder="Adınız Soyadınız"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">E-posta</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                            placeholder="ornek@mail.com"
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Şifre</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                            placeholder="En az 6 karakter"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            disabled={isLoading}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                    <input type="checkbox" id="terms" className="mt-1 w-4 h-4 text-accent rounded focus:ring-accent border-gray-300" required disabled={isLoading} />
                    <label htmlFor="terms" className="text-sm text-gray-500">
                        <a href="#" className="text-primary font-medium hover:underline">Kullanım Koşulları</a>'nı ve <a href="#" className="text-primary font-medium hover:underline">Gizlilik Politikası</a>'nı kabul ediyorum.
                    </label>
                </div>

                <button
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={24} className="animate-spin" />
                            Kayıt Yapılıyor...
                        </>
                    ) : (
                        <>
                            Hesap Oluştur
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-500">Zaten hesabın var mı? <Link to="/login" className="text-accent font-bold hover:underline ml-1">Giriş Yap</Link></p>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;