using System.Buffers.Text;

namespace Server.Models;

public class CreateDrinkRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public byte[] Image { get; set; }
    public string Instructions { get; set; }
    public List<DrinkIngredientDto> Ingredients { get; set; } = new();
    public List<TagDto> Tags { get; set; } = new();
}