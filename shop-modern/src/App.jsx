import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Context
import { ShopProvider, ShopContext } from './context/ShopContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer'; // Yeni eklenen Footer
import ScrollToTop from './utils/ScrollToTop';

// Layouts
import AccountLayout from './components/layouts/AccountLayout';
import AdminLayout from './components/layouts/AdminLayout';

// Pages - Shop
import HomePage from './pages/shop/HomePage';
import CartPage from './pages/shop/CartPage';
import CheckoutPage from './pages/shop/CheckoutPage';
import CategoryPage from './pages/shop/CategoryPage'; // Filtrelemeli Yeni Kategori Sayfası
import FavoritesPage from './pages/shop/FavoritesPage';
import ProductDetail from './pages/shop/ProductDetail';

// Pages - Auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Pages - Account
import AccountDashboard from './pages/account/AccountDashboard';
import OrdersView from './pages/account/OrdersView';
import AddressesView from './pages/account/AddressesView'; // API Bağlantılı Adres Sayfası
import ProfileView from './pages/account/ProfileView';
import PasswordView from './pages/account/PasswordView';

// Pages - Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

// İçerik Bileşeni (Loading durumunu kontrol edebilmek için ayrıldı)
const AppContent = () => {
  const { loading } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Uygulama ilk açıldığında (Token kontrolü, veri çekme vb.) yükleniyor ekranı göster
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-sans text-primary bg-white min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar setSearchTerm={setSearchTerm} />

        {/* Ana İçerik Alanı (Footer'ı aşağı itmek için flex-grow) */}
        <main className="flex-grow">
          <AnimatePresence mode='wait'>
            <Routes>
              {/* --- Shop Rotaları --- */}
              <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/category/:type" element={<CategoryPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* --- Auth Rotaları --- */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* --- Hesap Rotaları (AccountLayout ile sarılı) --- */}
              <Route path="/account" element={<AccountLayout><AccountDashboard /></AccountLayout>} />
              <Route path="/account/orders" element={<AccountLayout><OrdersView /></AccountLayout>} />
              <Route path="/account/addresses" element={<AccountLayout><AddressesView /></AccountLayout>} />
              <Route path="/account/profile" element={<AccountLayout><ProfileView /></AccountLayout>} />
              <Route path="/account/password" element={<AccountLayout><PasswordView /></AccountLayout>} />

              {/* --- Admin Rotaları (AdminLayout ile sarılı) --- */}
              <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
              <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
              <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;