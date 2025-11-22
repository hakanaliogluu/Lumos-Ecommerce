namespace Lumos.API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Gender { get; set; } = "unisex";
        public string Image { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}