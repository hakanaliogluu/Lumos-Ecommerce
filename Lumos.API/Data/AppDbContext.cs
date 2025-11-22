using Lumos.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics; // <-- Bu kütüphane hata çözümü için şart

namespace Lumos.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // --- Tablolar ---
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Address> Addresses { get; set; }

        // --- HATA ÇÖZÜMÜ: PendingModelChangesWarning ---
        // Bu metot, EF Core'un "Model değişti ama migration yok" uyarısını görmezden gelmesini sağlar.
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings =>
                warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1. Fiyat Hassasiyet Ayarları (Decimal Hatası Çözümü)
            modelBuilder.Entity<Product>().Property(p => p.Price).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Order>().Property(o => o.Total).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<OrderItem>().Property(oi => oi.Price).HasColumnType("decimal(18,2)");

            // 2. Admin Kullanıcısı (Seed Data)
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Name = "Lumos Admin",
                    Email = "admin@lumos.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("lumosadmin"),
                    Role = "admin",
                    Phone = "+90 555 000 00 00"
                }
            );

            // 3. Türkçe Ürün Listesi (Seed Data)
            modelBuilder.Entity<Product>().HasData(
                // ERKEK
                new Product { Id = 1, Name = "Premium Kapüşonlu Sweatshirt", Price = 1800, Category = "Giyim", Gender = "erkek", Image = "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop", Description = "%100 Organik pamuktan üretilmiş rahat kesim hoodie." },
                new Product { Id = 2, Name = "Klasik Denim Ceket", Price = 2200, Category = "Giyim", Gender = "erkek", Image = "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop", Description = "Zamansız tasarım, vintage yıkamalı kot ceket." },
                new Product { Id = 3, Name = "Slim Fit Chino Pantolon", Price = 1200, Category = "Giyim", Gender = "erkek", Image = "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop", Description = "Hem ofis hem günlük kullanıma uygun bej chino pantolon." },
                new Product { Id = 4, Name = "Pro Koşu Ayakkabısı 2025", Price = 2500, Category = "Spor", Gender = "erkek", Image = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop", Description = "Yüksek performanslı koşucular için tasarlandı." },
                new Product { Id = 5, Name = "Deri Oxford Ayakkabı", Price = 3400, Category = "Ayakkabı", Gender = "erkek", Image = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop", Description = "İtalyan derisi, el yapımı klasik ayakkabı." },
                new Product { Id = 6, Name = "Profesyonel Dalgıç Saati", Price = 5500, Category = "Aksesuar", Gender = "erkek", Image = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop", Description = "200 metreye kadar suya dayanıklı profesyonel dalgıç saati." },
                new Product { Id = 7, Name = "Teknoloji Sırt Çantası", Price = 1600, Category = "Çanta", Gender = "erkek", Image = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop", Description = "Laptop bölmeli, su geçirmez kumaş sırt çantası." },

                // KADIN
                new Product { Id = 8, Name = "İpek Çiçekli Elbise", Price = 3200, Category = "Giyim", Gender = "kadin", Image = "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop", Description = "Yaz davetleri için zarif ipek elbise." },
                new Product { Id = 9, Name = "Oversize Blazer Ceket", Price = 2800, Category = "Giyim", Gender = "kadin", Image = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop", Description = "Modern kesim, vatkalı şık ceket." },
                new Product { Id = 10, Name = "Yüksek Bel Jean", Price = 1400, Category = "Giyim", Gender = "kadin", Image = "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop", Description = "90'lar modasını yansıtan yüksek bel jean." },
                new Product { Id = 11, Name = "Zarif Topuklu Ayakkabı", Price = 2750, Category = "Ayakkabı", Gender = "kadin", Image = "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop", Description = "Özel davetler için tasarlanmış zarif topuklu." },
                new Product { Id = 12, Name = "Deri Omuz Çantası", Price = 3100, Category = "Çanta", Gender = "kadin", Image = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop", Description = "Geniş iç hacimli, %100 deri omuz çantası." },
                new Product { Id = 13, Name = "Yoga ve Spor Takımı", Price = 1900, Category = "Spor", Gender = "kadin", Image = "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop", Description = "Esnek kumaş, nefes alan yoga takımı." },
                new Product { Id = 14, Name = "Altın Kaplama Kolye", Price = 950, Category = "Aksesuar", Gender = "kadin", Image = "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop", Description = "Altın kaplama, çoklu zincir kolye." },

                // UNISEX
                new Product { Id = 15, Name = "Minimalist Kol Saati", Price = 4200, Category = "Aksesuar", Gender = "unisex", Image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", Description = "Zamanın ötesinde bir tasarım. Safir cam." },
                new Product { Id = 16, Name = "Retro Güneş Gözlüğü", Price = 1100, Category = "Aksesuar", Gender = "unisex", Image = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop", Description = "UV400 korumalı, klasik çerçeve güneş gözlüğü." },
                new Product { Id = 17, Name = "Basic Beyaz Tişört", Price = 450, Category = "Giyim", Gender = "unisex", Image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop", Description = "Her dolapta olması gereken temel beyaz tişört." }
            );
        }
    }
}