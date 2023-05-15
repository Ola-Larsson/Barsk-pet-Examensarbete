namespace Server.Models;

public class DrinkDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public string Instructions { get; set; }
    public List<DrinkIngredientDto> Ingredients { get; set; } = new();
    public List<TagDto> Tags { get; set; } = new();
    public string User { get; set; }
    public DateTime? Created { get; set; }
    public double? Rating { get; set; }
    public int? RatingCount { get; set; }
    public bool? IsFavorite { get; set; }
    public int? CurrentUserRating { get; set; }
    public bool? IsOwned { get; set; }
}