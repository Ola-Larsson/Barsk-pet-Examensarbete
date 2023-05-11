using Microsoft.AspNetCore.Identity;
using Server.Models;

namespace Server.Data;

public class SeedDatabase
{
    private readonly DatabaseContext _context;
    private readonly UserManager<IdentityUser> _userManager;

    public SeedDatabase(DatabaseContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task Seed()
    {
        if (!_userManager.Users.Any())
        {
            await SeedUsers();
        }

        if (!_context.Drinks.Any())
        {
            await SeedDrinks();
        }

        if (!_context.Drinks.Any())
        {
            await SeedDrinks();
        }
    }

    private async Task SeedUsers()
    {
        IdentityUser user = new()
        {
            Email = "test@test.com",
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = "test"
        };

        await _userManager.CreateAsync(user, "admin");
    }

    private async Task SeedDrinks()
    {
        var drinks = new List<Drink>
        {
            new Drink
            {
                Name = "Margarita",
                Description = "A margarita is a cocktail consisting of tequila, orange liqueur, and lime juice often served with salt on the rim of the glass. The drink is served shaken with ice, blended with ice, or without ice.",
                Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/MargaritaReal.jpg/220px-MargaritaReal.jpg",
                Instructions = "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
                Ingredients = new List<DrinkIngredient> {
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Tequila" }, Amount = "1.5 Oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Triple Sec" }, Amount = "0.5 Oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Lime Juice" }, Amount = "1 Oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Salt" }, Amount = "1 Oz" }
                },
                Tags = new List<Tag> {
                    new Tag { Name = "Tequila" },
                    new Tag { Name = "Triple Sec" },
                    new Tag { Name = "Lime Juice" },
                    new Tag { Name = "Salt" }
                },
                User = await _userManager.FindByEmailAsync("test@test.com"),
                Ratings = new List<Rating> {
                    new Rating { Value = 5, User = await _userManager.FindByEmailAsync("test@test.com")},
                    new Rating { Value = 4, User = await _userManager.FindByEmailAsync("test@test.com") },
                    new Rating { Value = 3, User = await _userManager.FindByEmailAsync("test@test.com") },
                    new Rating { Value = 2, User = await _userManager.FindByEmailAsync("test@test.com") },
                    new Rating { Value = 1, User = await _userManager.FindByEmailAsync("test@test.com") },
                },
            },
            new Drink
            {
                Name = "Martini",
                Description = "The martini is a cocktail made with gin and vermouth, and garnished with an olive or a lemon twist. Over the years, the martini has become one of the best-known mixed alcoholic beverages.",
                Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Martini_01.jpg/220px-Martini_01.jpg",
                Instructions = "Straight: Pour all ingredients into mixing glass with ice cubes. Stir well. Strain in chilled martini cocktail glass. Squeeze oil from lemon peel onto the drink, or garnish with olive.",
                Ingredients = new List<DrinkIngredient> {
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Gin" }, Amount = "1.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Dry Vermouth" }, Amount = "0.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Olive" }, Amount = "1" }
                },
                Tags = new List<Tag> {
                    new Tag { Name = "Gin" },
                    new Tag { Name = "Dry Vermouth" },
                    new Tag { Name = "Olive" }
                },
                User = await _userManager.FindByEmailAsync("test@test.com"),
                Ratings = new List<Rating> {
                    new Rating { Value = 5 },
                    new Rating { Value = 4 },
                    new Rating { Value = 3 },
                    new Rating { Value = 2 },
                    new Rating { Value = 1 },
                },
            },
            new Drink
            {
                Name = "Daiquiri",
                Description = "Daiquiri is a family of cocktails whose main ingredients are rum, citrus juice, and sugar or other sweetener.",
                Image = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Classic_Daiquiri_in_Coupe_Glass.jpg/220px-Classic_Daiquiri_in_Coupe_Glass.jpg",
                Instructions = "Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.",
                Ingredients = new List<DrinkIngredient> {
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "White Rum" }, Amount = "1.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Lime Juice" }, Amount = "0.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Simple Syrup" }, Amount = "0.5 oz" }
                },
                Tags = new List<Tag> {
                    new Tag { Name = "White Rum" },
                    new Tag { Name = "Lime Juice" },
                    new Tag { Name = "Simple Syrup" }
                },
                User = await _userManager.FindByEmailAsync("test@test.com"),
                Ratings = new List<Rating> {
                    new Rating { Value = 5, User = await _userManager.FindByEmailAsync("test@test.com")},
                    new Rating { Value = 4, User = await _userManager.FindByEmailAsync("test@test.com")},
                    new Rating { Value = 3, User = await _userManager.FindByEmailAsync("test@test.com")},
                    new Rating { Value = 2, User = await _userManager.FindByEmailAsync("test@test.com") },
                    new Rating { Value = 1, User = await _userManager.FindByEmailAsync("test@test.com") },
                },
            }
        };

        await _context.Drinks.AddRangeAsync(drinks);
        await _context.SaveChangesAsync();
    }
}

