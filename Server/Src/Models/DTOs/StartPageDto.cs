namespace Server.Models;

public class StartPageDto
{
    public List<SmallDrinkDto> Favorites { get; set; }
    public List<SmallDrinkDto> Recent { get; set; }
    public List<SmallDrinkDto> Popular { get; set; }
    public List<SmallDrinkDto> Recommended { get; set; }
}