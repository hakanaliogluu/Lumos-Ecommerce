// src/data/initialData.js
export const INITIAL_ADMIN = {
    id: 1,
    name: "Lumos Admin",
    email: "admin@lumos.com",
    password: "lumosadmin",
    role: "admin",
    phone: "+90 555 000 00 00",
    orders: [],
    addresses: []
};

export const INITIAL_PRODUCTS = [
    { id: 1, name: "Neo Runner 2025", price: 2500, category: "Spor", gender: "erkek", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop", description: "Yüksek performanslı koşucular için tasarlandı." },
    { id: 2, name: "Minimalist Watch", price: 4200, category: "Aksesuar", gender: "unisex", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", description: "Zamanın ötesinde bir tasarım. Safir cam." },
    { id: 3, name: "Urban Hoodie", price: 1800, category: "Giyim", gender: "erkek", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop", description: "%100 Organik pamuktan üretilmiş." },
    { id: 4, name: "Leather Bag", price: 3100, category: "Çanta", gender: "kadin", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop", description: "İtalyan derisi kullanılarak el işçiliği." },
    { id: 5, name: "Elegant Heels", price: 2750, category: "Ayakkabı", gender: "kadin", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop", description: "Özel davetler için tasarlanmış zarif topuklu." },
];