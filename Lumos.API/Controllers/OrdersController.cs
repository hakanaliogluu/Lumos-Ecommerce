using Lumos.API.Data;
using Lumos.API.DTOs;
using Lumos.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Lumos.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Sadece giriş yapmış kullanıcılar
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context) => _context = context;

        // Tüm siparişler (Admin) veya Kullanıcının siparişleri (Customer)
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var role = User.FindFirstValue(ClaimTypes.Role);

            var query = _context.Orders.Include(o => o.Items).AsQueryable();

            if (role != "admin")
                query = query.Where(o => o.UserId == userId);

            var orders = await query.OrderByDescending(o => o.Date).ToListAsync();
            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var order = new Order
            {
                UserId = userId,
                Total = dto.Total,
                Status = "Hazırlanıyor",
                Items = dto.Items.Select(i => new OrderItem
                {
                    ProductId = i.Id,
                    ProductName = i.Name,
                    ProductImage = i.Image,
                    Price = i.Price,
                    Quantity = 1 // Basitlik için 1 aldık, cart yapınıza göre artırılabilir
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return Ok(order);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateStatus(int id, UpdateStatusDto dto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();
            order.Status = dto.Status;
            await _context.SaveChangesAsync();
            return Ok(order);
        }
    }
}