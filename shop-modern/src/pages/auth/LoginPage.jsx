import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';
import AuthLayout from '../../components/layouts/AuthLayout';

const LoginPage = () => {
    const { login } = useContext(ShopContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage(""); // Önceki mesajları temizle
        setIsLoading(true);

        if (email && password) {
            try {
                // DÜZELTME: 'await' eklendi. Artık cevabı bekliyor.
                const result = await login(email, password);

                if (result.success) {
                    // Başarılı ise mesajı göster
                    setSuccessMessage(`Hoşgeldin, ${result.user.name}! Yönlendiriliyorsunuz...`);

                    // 1.5 Saniye bekle ve Yönlendir
                    setTimeout(() => {
                        if (result.user.role === 'admin') navigate("/admin");
                        else navigate("/");
                    }, 1500);
                } else {
                    // Başarısız ise hatayı göster ve yüklenmeyi durdur
                    setError(result.message);
                    setIsLoading(false);
                }
            } catch (err) {
                setError("Beklenmedik bir hata oluştu.");
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="Tekrar Hoşgeldin" subtitle="Hesabına giriş yap." image="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop">

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

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-gray-700">Şifre</label>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                            placeholder="••••••••"
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

                <button
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={24} className="animate-spin" />
                            Giriş Yapılıyor...
                        </>
                    ) : (
                        <>
                            Giriş Yap
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-500">Henüz hesabın yok mu? <Link to="/register" className="text-accent font-bold hover:underline ml-1">Hemen Kayıt Ol</Link></p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;