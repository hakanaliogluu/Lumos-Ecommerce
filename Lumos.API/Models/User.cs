using System.Net;

namespace Lumos.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "customer"; // "admin" veya "customer"
        public string? Phone { get; set; }

        // İlişkiler
        public List<Address> Addresses { get; set; } = new();
        public List<Order> Orders { get; set; } = new();
    }
}