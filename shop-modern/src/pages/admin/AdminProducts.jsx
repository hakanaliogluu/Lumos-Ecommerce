import React, { useContext, useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const AdminProducts = () => {
    const { products, removeProduct, addProduct } = useContext(ShopContext);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ name: "", price: "", category: "Giyim", gender: "unisex", image: "", description: "" });
    const handleAdd = (e) => { e.preventDefault(); addProduct({ ...formData, price: Number(formData.price) }); setIsAdding(false); setFormData({ name: "", price: "", category: "Giyim", gender: "unisex", image: "", description: "" }); };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Ürün Yönetimi</h1>
                <button onClick={() => setIsAdding(!isAdding)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800">{isAdding ? <X size={20} /> : <Plus size={20} />} {isAdding ? "İptal" : "Yeni Ürün Ekle"}</button>
            </div>
            {isAdding && (
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-200 animate-in slide-in-from-top-4">
                    <h3 className="font-bold text-lg mb-4">Yeni Ürün Bilgileri</h3>
                    <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
                        <input required placeholder="Ürün Adı" className="border p-3 rounded-lg" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        <input required type="number" placeholder="Fiyat (TL)" className="border p-3 rounded-lg" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                        <select className="border p-3 rounded-lg" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}><option>Giyim</option><option>Ayakkabı</option><option>Aksesuar</option><option>Spor</option><option>Çanta</option></select>
                        <select className="border p-3 rounded-lg" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}><option value="unisex">Unisex</option><option value="erkek">Erkek</option><option value="kadin">Kadın</option></select>
                        <input required placeholder="Resim URL" className="border p-3 rounded-lg col-span-2" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                        <textarea required placeholder="Açıklama" className="border p-3 rounded-lg col-span-2" rows="2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        <button className="bg-green-600 text-white py-3 rounded-lg font-bold col-span-2 hover:bg-green-700">Ürünü Kaydet</button>
                    </form>
                </div>
            )}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm"><tr><th className="p-4">Ürün</th><th className="p-4">Kategori</th><th className="p-4">Fiyat</th><th className="p-4 text-right">İşlem</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-3"><img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-gray-100" alt="" /><span className="font-medium">{p.name}</span></td>
                                <td className="p-4 text-sm text-gray-500">{p.category}</td>
                                <td className="p-4 font-bold text-gray-700">₺{p.price}</td>
                                <td className="p-4 text-right"><button onClick={() => removeProduct(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={18} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;