namespace Server.Models;

public class Rating : BaseEntity
{
    public Drink Drink { get; set; }
    public Guid DrinkId { get; set; }
    public ApplicationUser User { get; set; }
    public string UserId { get; set; }
    public int Value { get; set; }
}