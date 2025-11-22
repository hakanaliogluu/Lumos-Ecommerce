using Lumos.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// 1. SERVÝSLERÝN EKLENMESÝ (Dependency Injection)
// ==========================================

// A. Veritabaný Baðlantýsý (SQL Server)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// B. Controller Desteði
builder.Services.AddControllers();

// C. Swagger / OpenAPI Ayarlarý (JWT Kilit Simgesi Ýçin)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standart Authorization header kullanarak Bearer þemasý. Örnek: \"bearer {token}\"",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

// D. CORS Ayarlarý (React Frontend Ýzni - Port 5173)
builder.Services.AddCors(options => options.AddPolicy("AllowReactApp",
    policy => policy.WithOrigins("http://localhost:5173")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials())); // Çerez veya kmlik bilgisi gerekirse diye

// E. JWT Kimlik Doðrulama Ayarlarý
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var app = builder.Build();

// ==========================================
// 2. VERÝTABANI BAÞLATMA VE SIFIRLAMA (Seed Data)
// ==========================================
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // --- DÝKKAT: BU SATIR ESKÝ VERÝTABANINI SÝLER ---
    // Türkçe ürünlerin gelmesi için bunu 1 kere çalýþtýrýn,
    // sonra bu satýrý YORUM SATIRI yapýn (Baþýna // koyun).
    db.Database.EnsureDeleted();

    // Veritabanýný (yoksa) oluþturur ve ürünleri ekler
    db.Database.EnsureCreated();
}

// ==========================================
// 3. HTTP REQUEST PIPELINE (Middleware)
// ==========================================

// Geliþtirme Ortamý Ayarlarý
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS Politikasý (React'in baðlanmasý için þart)
app.UseCors("AllowReactApp");

// Kimlik Doðrulama ve Yetkilendirme (Sýrasý Önemli!)
app.UseAuthentication(); // Önce: Kimsin?
app.UseAuthorization();  // Sonra: Yetkin var mý?

// Controller'larý Eþle
app.MapControllers();

app.Run();