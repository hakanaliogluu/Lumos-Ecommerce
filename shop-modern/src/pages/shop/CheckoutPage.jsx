import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { AlertCircle } from 'lucide-react';

const CheckoutPage = () => {
    const { cart, completeOrder } = useContext(ShopContext);
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const total = subtotal + (subtotal > 5000 ? 0 : 150);

    // Form State
    const [form, setForm] = useState({
        name: '', surname: '', address: '',
        cardName: '', cardNo: '', expiry: '', cvv: ''
    });

    const [errors, setErrors] = useState({});

    // Input Değişikliklerini Yönet
    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Kart Numarası: Sadece sayı, max 16 karakter
        if (name === 'cardNo') {
            formattedValue = value.replace(/\D/g, '').slice(0, 16);
        }
        // CVV: Sadece sayı, max 3 karakter
        if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }
        // Tarih: AA/YY formatı
        if (name === 'expiry') {
            // Basitçe max 5 karakter izin ver (örn: 12/25)
            if (value.length > 5) return;
        }

        setForm({ ...form, [name]: formattedValue });
        // Hata varsa temizle
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    // Validasyon Fonksiyonu
    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = "Ad alanı zorunludur.";
        if (!form.surname) newErrors.surname = "Soyad alanı zorunludur.";
        if (!form.address) newErrors.address = "Adres alanı zorunludur.";
        if (!form.cardName) newErrors.cardName = "Kart üzerindeki isim zorunludur.";

        if (!form.cardNo || form.cardNo.length !== 16) {
            newErrors.cardNo = "Kart numarası 16 haneli olmalıdır.";
        }
        if (!form.cvv || form.cvv.length !== 3) {
            newErrors.cvv = "CVV 3 haneli olmalıdır.";
        }
        // Basit Tarih Kontrolü (AA/YY)
        const dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (!form.expiry || !dateRegex.test(form.expiry)) {
            newErrors.expiry = "Geçerli format: AA/YY (Örn: 12/25)";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = (e) => {
        e.preventDefault();
        if (validate()) {
            setTimeout(() => {
                completeOrder();
                navigate('/account/orders');
            }, 1500);
        }
    };

    if (cart.length === 0) return <div className="pt-32 text-center">Sepet boş.</div>;

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2 gap-12">
            <div>
                <h1 className="text-3xl font-bold mb-8">Ödeme Bilgileri</h1>
                <form onSubmit={handlePayment} className="space-y-8">

                    {/* Adres Bilgileri */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="font-bold text-xl mb-4">Teslimat Adresi</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input name="name" value={form.name} onChange={handleChange} placeholder="Ad" className={`w-full bg-gray-50 p-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-transparent'}`} />
                                {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.name}</p>}
                            </div>
                            <div>
                                <input name="surname" value={form.surname} onChange={handleChange} placeholder="Soyad" className={`w-full bg-gray-50 p-3 rounded-lg border ${errors.surname ? 'border-red-500' : 'border-transparent'}`} />
                                {errors.surname && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.surname}</p>}
                            </div>
                            <div className="col-span-2">
                                <textarea name="address" value={form.address} onChange={handleChange} placeholder="Adres" rows="3" className={`w-full bg-gray-50 p-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-transparent'}`}></textarea>
                                {errors.address && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.address}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Kart Bilgileri */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="font-bold text-xl mb-4">Kart Bilgileri</h2>
                        <div className="space-y-4">
                            <div>
                                <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Kart Üzerindeki İsim" className={`w-full bg-gray-50 p-3 rounded-lg border ${errors.cardName ? 'border-red-500' : 'border-transparent'}`} />
                                {errors.cardName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.cardName}</p>}
                            </div>

                            <div>
                                <input name="cardNo" value={form.cardNo} onChange={handleChange} placeholder="Kart No (16 Hane)" maxLength="16" className={`w-full bg-gray-50 p-3 rounded-lg border ${errors.cardNo ? 'border-red-500' : 'border-transparent'}`} />
                                {errors.cardNo && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.cardNo}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="AA/YY" maxLength="5" className={`w-full bg-gray-50 p-3 rounded-lg border ${errors.expiry ? 'border-red-500' : 'border-transparent'}`} />
                                    {errors.expiry && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.expiry}</p>}
                                </div>
                                <div>
                                    <input name="cvv" value={form.cvv} onChange={handleChange} placeholder="CVV" maxLength="3" className={`w-full bg-gray-50 p-3 rounded-lg border ${errors.cvv ? 'border-red-500' : 'border-transparent'}`} />
                                    {errors.cvv && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.cvv}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg shadow-primary/20">
                        Ödemeyi Tamamla (₺{total})
                    </button>
                </form>
            </div>

            {/* Sepet Özeti */}
            <div className="h-fit bg-gray-50 p-6 rounded-3xl sticky top-24 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Sepet</h3>
                <div className="space-y-4">
                    {cart.map((item, i) => (
                        <div key={i} className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100">
                            <img src={item.image} className="w-16 h-16 rounded-lg object-cover" alt={item.name} />
                            <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-gray-500 text-sm">₺{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 mt-6 pt-4 font-bold flex justify-between text-lg">
                    <span>Toplam</span><span>₺{total}</span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;