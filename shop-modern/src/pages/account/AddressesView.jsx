import React, { useContext, useState, useEffect } from 'react';
import { MapPin, Plus, Trash2, X, Home } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const AddressesView = () => {
    const { addresses, fetchAddresses, addAddress, deleteAddress } = useContext(ShopContext);
    const [showModal, setShowModal] = useState(false);
    const [newAddr, setNewAddr] = useState({ title: '', city: '', detail: '' });

    // Sayfa açılınca adresleri çek
    useEffect(() => { fetchAddresses(); }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        const res = await addAddress(newAddr);
        if (res.success) {
            setShowModal(false);
            setNewAddr({ title: '', city: '', detail: '' });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Adreslerim</h2>
                    <p className="text-gray-500 text-sm mt-1">Kayıtlı teslimat adreslerini yönet.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-primary/20">
                    <Plus size={18} /> Yeni Ekle
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Adres Kartları */}
                {addresses.map(addr => (
                    <div key={addr.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all relative group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="bg-orange-50 text-orange-600 p-3 rounded-xl">
                                <Home size={24} />
                            </div>
                            <button onClick={() => deleteAddress(addr.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2">
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{addr.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-1">{addr.detail}</p>
                        <p className="text-gray-900 font-medium text-sm">{addr.city}</p>
                    </div>
                ))}

                {addresses.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        <MapPin className="mx-auto text-gray-400 mb-3" size={48} />
                        <p className="text-gray-500">Henüz kayıtlı adresiniz yok.</p>
                    </div>
                )}
            </div>

            {/* MODAL (Pop-up) */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-md animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Yeni Adres Ekle</h3>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleAdd} className="space-y-4">
                            <input required placeholder="Adres Başlığı (Ev, İş vb.)" className="w-full bg-gray-50 p-3 rounded-xl border-transparent focus:border-primary outline-none" value={newAddr.title} onChange={e => setNewAddr({ ...newAddr, title: e.target.value })} />
                            <input required placeholder="Şehir" className="w-full bg-gray-50 p-3 rounded-xl border-transparent focus:border-primary outline-none" value={newAddr.city} onChange={e => setNewAddr({ ...newAddr, city: e.target.value })} />
                            <textarea required placeholder="Açık Adres" rows="3" className="w-full bg-gray-50 p-3 rounded-xl border-transparent focus:border-primary outline-none" value={newAddr.detail} onChange={e => setNewAddr({ ...newAddr, detail: e.target.value })} />
                            <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">Kaydet</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressesView;