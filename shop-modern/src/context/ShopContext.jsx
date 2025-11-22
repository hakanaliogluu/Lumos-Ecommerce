import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

// ⚠️ Backend portunuzun (7211) doğru olduğundan emin olun.
const API_URL = "https://localhost:7211/api";

export const ShopProvider = ({ children }) => {
    // --- STATE TANIMLARI ---
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- YARDIMCI: Auth Header Oluşturucu ---
    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
    };

    // --- SİPARİŞLERİ ÇEKME FONKSİYONU ---
    const fetchOrders = async (tokenArg = null) => {
        try {
            const token = tokenArg || localStorage.getItem("token");
            if (!token) return;

            const res = await fetch(`${API_URL}/orders`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.status === 401) {
                console.warn("Oturum süresi doldu, çıkış yapılıyor...");
                logout();
                return;
            }

            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Siparişler yüklenemedi", error);
        }
    };

    // --- 1. UYGULAMA BAŞLANGICI ---
    useEffect(() => {
        const initApp = async () => {
            try {
                // Ürünleri Çek
                const prodRes = await fetch(`${API_URL}/products`);
                if (prodRes.ok) {
                    const data = await prodRes.json();
                    setProducts(data);
                }

                // Oturum Kontrolü
                const storedUser = localStorage.getItem('user');
                const storedToken = localStorage.getItem('token');

                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    // Mevcut token ile siparişleri çek
                    await fetchOrders(storedToken);
                }

            } catch (error) {
                console.error("Başlangıç hatası:", error);
            } finally {
                setLoading(false);
            }
        };

        initApp();
    }, []);

    // --- 2. AUTH İŞLEMLERİ ---

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, message: data.title || "Giriş başarısız." };
            }

            // Token ve User'ı kaydet
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setUser(data.user);
            // Giriş yapar yapmaz siparişleri çek
            await fetchOrders(data.token);

            return { success: true, user: data.user };

        } catch (error) {
            console.error("Login Hatası:", error);
            return { success: false, message: "Sunucuya bağlanılamadı." };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            if (!response.ok) {
                const errorText = await response.text();
                return { success: false, message: errorText || "Kayıt başarısız." };
            }
            return { success: true };
        } catch (error) {
            return { success: false, message: "Sunucu hatası." };
        }
    };

    const logout = () => {
        setUser(null);
        setOrders([]);
        setCart([]);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    // Profil Güncelleme (İsim, Telefon vb.)
    const updateUserData = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    // --- YENİ EKLENEN: ŞİFRE DEĞİŞTİRME ---
    const changePassword = async (oldPassword, newPassword) => {
        try {
            const res = await fetch(`${API_URL}/auth/change-password`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({ oldPassword, newPassword })
            });

            // Backend bazen JSON bazen string dönebilir, kontrol edelim
            const contentType = res.headers.get("content-type");
            let data;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await res.json();
            } else {
                data = await res.text();
            }

            if (!res.ok) {
                return { success: false, message: data.message || data || "İşlem başarısız." };
            }

            return { success: true, message: "Şifreniz başarıyla güncellendi." };

        } catch (error) {
            console.error("Şifre değiştirme hatası:", error);
            return { success: false, message: "Sunucu hatası." };
        }
    };

    // --- 3. ÜRÜN & SİPARİŞ YÖNETİMİ ---
    const addProduct = async (newProduct) => {
        try {
            const res = await fetch(`${API_URL}/products`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(newProduct)
            });
            if (res.ok) {
                const savedProduct = await res.json();
                setProducts([...products, savedProduct]);
            }
        } catch (error) { console.error(error); }
    };

    const removeProduct = async (id) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders()
            });
            if (res.ok) {
                setProducts(products.filter(p => p.id !== id));
            }
        } catch (error) { console.error(error); }
    };

    const completeOrder = async () => {
        const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
        const total = subtotal + (subtotal > 5000 ? 0 : 150);

        const orderDto = {
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image
            })),
            total: total
        };

        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(orderDto)
            });

            if (res.ok) {
                const newOrder = await res.json();
                setOrders([newOrder, ...orders]);
                setCart([]);
            }
        } catch (error) { console.error("Sipariş hatası", error); }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            const res = await fetch(`${API_URL}/orders/${id}/status`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
            }
        } catch (error) { console.error(error); }
    };

    // --- 4. SEPET & FAVORİLER (Client-Side) ---
    const addToCart = (p) => setCart([...cart, p]);
    const removeFromCart = (i) => setCart(cart.filter((_, index) => index !== i));
    const toggleFavorite = (p) => setFavorites(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);

    // --- ADRES YÖNETİMİ ---
    const [addresses, setAddresses] = useState([]);

    const fetchAddresses = async () => {
        try {
            const res = await fetch(`${API_URL}/addresses`, { headers: getAuthHeaders() });
            if (res.ok) setAddresses(await res.json());
        } catch (error) { console.error("Adresler yüklenemedi", error); }
    };

    const addAddress = async (addressData) => {
        try {
            const res = await fetch(`${API_URL}/addresses`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(addressData)
            });
            if (res.ok) {
                const newAddress = await res.json();
                setAddresses([...addresses, newAddress]);
                return { success: true };
            }
        } catch (error) { return { success: false }; }
    };

    const deleteAddress = async (id) => {
        try {
            const res = await fetch(`${API_URL}/addresses/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders()
            });
            if (res.ok) {
                setAddresses(addresses.filter(a => a.id !== id));
            }
        } catch (error) { console.error(error); }
    };

    // useEffect içine şu satırı ekleyin (Login kontrolünün altına):
    // if (storedUser && storedToken) { ... await fetchAddresses(); }

    return (
        <ShopContext.Provider value={{
            products, cart, favorites, orders, user, loading,
            addToCart, removeFromCart, toggleFavorite, completeOrder,
            login, register, logout, updateUserData, changePassword, // changePassword EKLENDİ
            addProduct, removeProduct, updateOrderStatus
        }}>
            {children}
        </ShopContext.Provider>
    );
};