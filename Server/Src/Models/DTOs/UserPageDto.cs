namespace Server.Models;

public class UserPageDto
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public List<DrinkDto> Drinks { get; set; } = new();
}