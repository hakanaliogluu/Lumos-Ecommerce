import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, Search, User, LayoutDashboard } from 'lucide-react';
import { ShopContext } from '../../context/ShopContext';

const Navbar = ({ setSearchTerm }) => {
    const { cart, user } = useContext(ShopContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Yerel state: Input'a yazılanı anlık gösterir
    const [localSearch, setLocalSearch] = useState("");

    // DEBOUNCE MANTIĞI:
    // Kullanıcı yazmayı bıraktıktan 500ms (0.5sn) sonra ana aramayı tetikler.
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchTerm(localSearch);

            // Eğer arama doluysa ve anasayfada değilsek anasayfaya yönlendir
            if (localSearch.trim() !== "" && location.pathname !== '/') {
                navigate('/');
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [localSearch, setSearchTerm, navigate, location.pathname]);

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-4">
                <Link to="/" className="text-2xl font-bold tracking-tighter text-primary shrink-0">
                    LUMOS<span className="text-accent">.</span>
                </Link>

                <div className="hidden md:flex flex-1 max-w-md mx-4 relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        placeholder="Ürün ara..."
                        className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-full py-2.5 pl-10 pr-4 text-sm transition-all outline-none"
                    />
                </div>

                <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
                    <Link to="/category/erkek" className="hover:text-primary hover:font-bold transition-all">Erkek</Link>
                    <Link to="/category/kadin" className="hover:text-primary hover:font-bold transition-all">Kadın</Link>
                    <Link to="/favorites" className="hover:text-primary hover:font-bold transition-all">Favorilerim</Link>

                    {user && user.role === 'admin' && (
                        <Link to="/admin" className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-red-100 transition-colors">
                            <LayoutDashboard size={16} /> Admin
                        </Link>
                    )}

                    {user ? (
                        <Link to="/account" className="hover:text-primary hover:font-bold transition-all text-accent">Hesabım</Link>
                    ) : (
                        <Link to="/login" className="hover:text-primary hover:font-bold transition-all flex items-center gap-1">
                            <User size={16} /> Giriş Yap
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                        <ShoppingBag size={24} />
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                    <button className="md:hidden p-2 text-gray-700"><Menu size={24} /></button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;