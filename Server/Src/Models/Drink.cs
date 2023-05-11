using Microsoft.AspNetCore.Identity;

namespace Server.Models;

public class Drink : BaseEntity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string Image { get; set; }
    public string Instructions { get; set; }

    public List<DrinkIngredient> Ingredients { get; set; }
    public List<Rating> Ratings { get; set; }
    public List<Tag> Tags { get; set; }
    public string UserId { get; set; }
    public IdentityUser User { get; set; }

    public string Slug => Name?.Replace(' ', '-').ToLowerInvariant();
    public double AverageRating => Ratings?.Count > 0 ? Ratings.Average(r => r.Value) : 0;
    public int RatingCount => Ratings?.Count ?? 0;
}