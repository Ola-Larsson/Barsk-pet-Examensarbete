using Microsoft.AspNetCore.Identity;
using Server.Models;
using Server.Services;

namespace Server.Data;

public class SeedDatabase
{
    private readonly DatabaseContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly MediaService _mediaService;

    public SeedDatabase(DatabaseContext context, UserManager<ApplicationUser> userManager, MediaService mediaService)
    {
        _context = context;
        _userManager = userManager;
        _mediaService = mediaService;
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
        ApplicationUser user = new()
        {
            Email = "test@test.com",
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = "test"
        };

        await _userManager.CreateAsync(user, "admin");
    }

    private class urlId
    {
        public string url { get; set; }
        public string id { get; set; }
    }

    private async Task SeedDrinks()
    {
        var drinkImages = new Dictionary<string, urlId>
        {
            {"Margarita", new urlId { url = "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg", id = null}},
            {"Martini", new urlId { url = "https://www.thecocktaildb.com/images/media/drink/6ck9yi1589574317.jpg", id = null}},
            {"Daiquiri", new urlId { url = "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg", id = null}},
            {"Mojito", new urlId { url = "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg", id = null}},
            {"Old Fashioned", new urlId { url = "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg", id = null}},
            {"Long Island Tea", new urlId { url = "https://www.thecocktaildb.com/images/media/drink/tppn6i1589574695.jpg", id = null}},
            {"Whiskey Sour", new urlId { url = "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg", id = null}},
            {"Cocktail Horse's Neck", new urlId { url = "https://www.thecocktaildb.com/images/media/drink/5yhd3n1571687385.jpg", id = null}},
        };

        var httpClient = new HttpClient();
        foreach (var d in drinkImages)
        {
            var image = await httpClient.GetByteArrayAsync(d.Value.url);
            var url = await _mediaService.Save(image);
            drinkImages[d.Key].id = url;
        }


        var drinks = new List<Drink>
        {
            new Drink
            {
                Name = "Margarita",
                Description = "A margarita is a cocktail consisting of tequila, orange liqueur, and lime juice often served with salt on the rim of the glass. The drink is served shaken with ice, blended with ice, or without ice.",
                Image = drinkImages["Margarita"].id,
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
                Image = drinkImages["Martini"].id,
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
                    new Rating { Value = 5, User = await _userManager.FindByEmailAsync("test@test.com")},
                    new Rating { Value = 4, User = await _userManager.FindByEmailAsync("test@test.com") },
                    new Rating { Value = 3, User = await _userManager.FindByEmailAsync("test@test.com") },
                    new Rating { Value = 2, User = await _userManager.FindByEmailAsync("test@test.com") },
                    new Rating { Value = 1, User = await _userManager.FindByEmailAsync("test@test.com") },
                },
            },
            new Drink
            {
                Name = "Daiquiri",
                Description = "Daiquiri is a family of cocktails whose main ingredients are rum, citrus juice, and sugar or other sweetener.",
                Image = drinkImages["Daiquiri"].id,
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
            },
            new Drink
            {
                Name = "Mojito",
                Description = "A mojito is a cocktail that consists of five ingredients: white rum, sugar, lime juice, soda water, and mint.",
                Image = drinkImages["Mojito"].id,
                Instructions = "Muddle mint springs with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.",
                Ingredients = new List<DrinkIngredient> {
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "White Rum" }, Amount = "1.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Lime Juice" }, Amount = "0.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Mint" }, Amount = "2" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Sugar" }, Amount = "2 tsp" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Soda Water" }, Amount = "1 oz" }
                },
                Tags = new List<Tag> {
                    new Tag { Name = "White Rum" },
                    new Tag { Name = "Lime Juice" },
                    new Tag { Name = "Mint" },
                    new Tag { Name = "Sugar" },
                    new Tag { Name = "Soda Water" }
                },
                User = await _userManager.FindByEmailAsync("test@test.com"),
                Ratings = new List<Rating> {
                    new Rating { Value = 5, User = await _userManager.FindByEmailAsync("test@test.com")},
                },
            },
            new Drink
            {
                Name = "Old Fashioned",
                Description = "The Old Fashioned is a cocktail made by muddling sugar with bitters and water, adding whiskey or, less commonly, brandy, and garnishing with orange slice or zest and a cocktail cherry.",
                Image = drinkImages["Old Fashioned"].id,
                Instructions = "In an old-fashioned glass, place a sugar cube then add bitters, whiskey, and ice. Garnish with orange twist, and a cocktail cherry.",
                Ingredients = new List<DrinkIngredient> {
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Bourbon" }, Amount = "1.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Angostura Bitters" }, Amount = "2 dashes" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Sugar" }, Amount = "1 cube" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Orange" }, Amount = "1" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Cocktail Cherry" }, Amount = "1" }
                },
                Tags = new List<Tag> {
                    new Tag { Name = "Bourbon" },
                    new Tag { Name = "Angostura Bitters" },
                    new Tag { Name = "Sugar" },
                    new Tag { Name = "Orange" },
                    new Tag { Name = "Cocktail Cherry" }
                },
                User = await _userManager.FindByEmailAsync("test@test.com"),
                Ratings = new List<Rating> {
                    new Rating { Value = 5, User = await _userManager.FindByEmailAsync("test@test.com")},
                },
            },
            new Drink
            {
                Name = "Long Island Tea",
                Description = "A Long Island iced tea is a type of alcoholic mixed drink typically made with vodka, tequila, light rum, triple sec, gin, and a splash of cola, which gives the drink the same amber hue as its namesake.",
                Image = drinkImages["Long Island Tea"].id,
                Instructions = "Add all ingredients into highball glass filled with ice. Stir gently. Garnish with lemon spiral. Serve with straw.",
                Ingredients = new List<DrinkIngredient> {
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Vodka" }, Amount = "0.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Tequila" }, Amount = "0.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Light Rum" }, Amount = "0.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Triple Sec" }, Amount = "0.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Gin" }, Amount = "0.5 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Coca-Cola" }, Amount = "1 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Lemon" }, Amount = "1" }
                },
                Tags = new List<Tag> {
                    new Tag { Name = "Vodka" },
                    new Tag { Name = "Tequila" },
                    new Tag { Name = "Light Rum" },
                    new Tag { Name = "Triple Sec" },
                    new Tag { Name = "Gin" },
                    new Tag { Name = "Coca-Cola" },
                    new Tag { Name = "Lemon" }
                },
                User = await _userManager.FindByEmailAsync("test@test.com"),
                Ratings = new List<Rating> {
                    new Rating { Value = 5, User = await _userManager.FindByEmailAsync("test@test.com")},
                },
            },
            new Drink
            {
                Name = "Whiskey Sour",
                Description = "The whiskey sour is a mixed drink containing whiskey, lemon juice, sugar, and optionally, a dash of egg white.",
                Image = drinkImages["Whiskey Sour"].id,
                Instructions = "Shake with ice. Strain into chilled glass, garnish and serve.",
                Ingredients = new List<DrinkIngredient> {
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Bourbon" }, Amount = "2 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Lemon Juice" }, Amount = "1 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Sugar" }, Amount = "1 tsp" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Egg White" }, Amount = "1" }
                },
                Tags = new List<Tag> {
                    new Tag { Name = "Bourbon" },
                    new Tag { Name = "Lemon Juice" },
                    new Tag { Name = "Sugar" },
                    new Tag { Name = "Egg White" }
                },
                User = await _userManager.FindByEmailAsync("test@test.com"),
                Ratings = new List<Rating> {
                    new Rating { Value = 5, User = await _userManager.FindByEmailAsync("test@test.com")},
                },
            },
            new Drink
            {
                Name = "Cocktail Horse's Neck",
                Description = "A non-alcoholic mixed drink made with ginger ale, ice and lemon peel.",
                Image = drinkImages["Cocktail Horse's Neck"].id,
                Instructions = "Pour ginger ale over ice in a highball glass. Add the twist of lemon peel and serve.",
                Ingredients = new List<DrinkIngredient> {
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Ginger Ale" }, Amount = "4 oz" },
                    new DrinkIngredient { Ingredient = new Ingredient { Name = "Lemon Peel" }, Amount = "1" }
                },
                Tags = new List<Tag> {
                    new Tag { Name = "Ginger Ale" },
                    new Tag { Name = "Lemon Peel" }
                },
                User = await _userManager.FindByEmailAsync("test@test.com"),
                Ratings = new List<Rating> {
                    new Rating { Value = 5, User = await _userManager.FindByEmailAsync("test@test.com")},
                },
            },
        };

        await _context.Drinks.AddRangeAsync(drinks);
        await _context.SaveChangesAsync();
    }
}

