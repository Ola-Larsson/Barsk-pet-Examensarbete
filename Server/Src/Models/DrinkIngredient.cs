namespace Server.Models;

public class DrinkIngredient : BaseEntity
{
    public Ingredient Ingredient { get; set; }
    public string Amount { get; set; }
    public Guid DrinkId { get; set; }
}