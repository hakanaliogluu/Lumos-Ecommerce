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
    public class AddressesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AddressesController(AppDbContext context) => _context = context;

        // Kullanıcının Adreslerini Getir
        [HttpGet]
        public async Task<IActionResult> GetMyAddresses()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var addresses = await _context.Addresses.Where(a => a.UserId == userId).ToListAsync();
            return Ok(addresses);
        }

        // Yeni Adres Ekle
        [HttpPost]
        public async Task<IActionResult> AddAddress(AddressDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var address = new Address { Title = dto.Title, Detail = dto.Detail, City = dto.City, UserId = userId };

            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();
            return Ok(address);
        }

        // Adres Sil
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (address == null) return NotFound();

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}