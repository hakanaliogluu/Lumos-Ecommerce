namespace Lumos.API.DTOs

{

    public record RegisterDto(string Name, string Email, string Password);

    public record LoginDto(string Email, string Password);

    public record CreateOrderDto(List<CartItemDto> Items, decimal Total);

    public record CartItemDto(int Id, string Name, decimal Price, string Image); // ProductId olarak Id kullanıyoruz

    public record UpdateStatusDto(string Status);

    public record ProductDto(string Name, decimal Price, string Category, string Gender, string Image, string Description);

    public record ChangePasswordDto(string OldPassword, string NewPassword);

    // Şifresiz kullanıcı verisi için
    public record UserDto(int Id, string Name, string Email, string Role, string Phone);

    public record AddressDto(string Title, string Detail, string City);
}