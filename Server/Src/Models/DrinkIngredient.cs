namespace Server.Models;

public class DrinkIngredient : BaseEntity
{
    public Guid DrinkId { get; set; }
    public Guid IngredientId { get; set; }
    public Ingredient Ingredient { get; set; }
    public string Amount { get; set; }
}