import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Marka */}
                    <div className="space-y-4">
                        <Link to="/" className="text-3xl font-bold tracking-tighter text-white">
                            LUMOS<span className="text-accent">.</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Modern yaşamın ritmini yakalayan tasarımlar. Kalite ve estetiğin buluşma noktası.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Hızlı Linkler */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Koleksiyonlar</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="/category/erkek" className="hover:text-accent transition-colors">Erkek Giyim</Link></li>
                            <li><Link to="/category/kadin" className="hover:text-accent transition-colors">Kadın Giyim</Link></li>
                            <li><Link to="/category/unisex" className="hover:text-accent transition-colors">Aksesuarlar</Link></li>
                            <li><Link to="/category/spor" className="hover:text-accent transition-colors">Spor Giyim</Link></li>
                        </ul>
                    </div>

                    {/* Kurumsal */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Kurumsal</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><Link to="#" className="hover:text-accent transition-colors">Hakkımızda</Link></li>
                            <li><Link to="#" className="hover:text-accent transition-colors">Sürdürülebilirlik</Link></li>
                            <li><Link to="#" className="hover:text-accent transition-colors">Kariyer</Link></li>
                            <li><Link to="#" className="hover:text-accent transition-colors">İletişim</Link></li>
                        </ul>
                    </div>

                    {/* İletişim */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Bize Ulaşın</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-accent shrink-0" />
                                <span>Maslak Mah. Büyükdere Cad. No:123<br />Sarıyer / İstanbul</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-accent shrink-0" />
                                <span>+90 (212) 555 00 00</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-accent shrink-0" />
                                <span>info@lumos.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; 2025 LUMOS Inc. Tüm hakları saklıdır.</p>
                    <div className="flex gap-6">
                        <Link to="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
                        <Link to="#" className="hover:text-white transition-colors">Kullanım Şartları</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;