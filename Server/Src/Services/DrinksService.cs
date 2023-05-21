using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Server.Data;
using Server.Models;

namespace Server.Services;

public class DrinksService
{
    private readonly DatabaseContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly MediaService _mediaService;

    public DrinksService(DatabaseContext context,
        IHttpContextAccessor httpContextAccessor,
        UserManager<ApplicationUser> userManager,
        MediaService mediaService)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _mediaService = mediaService;
    }

    public async Task<IEnumerable<DrinkDto>> Get()
    {
        var drinks = await _context.Drinks
            .Include(d => d.User)
                .ThenInclude(u => u.Favorites)
            .Include(d => d.Ratings)
            .Include(d => d.Tags)
            .Include(d => d.User)
            .Include(d => d.Ingredients)
                .ThenInclude(i => i.Ingredient)
            .ToListAsync();

        var drinksDto = drinks.Select(x => new DrinkDto
        {
            Id = x.Id,
            Name = x.Name,
            Description = x.Description,
            ImageUrl = x.Image,
            Instructions = x.Instructions,
            Ingredients = x.Ingredients.Select(i => new DrinkIngredientDto
            {
                Name = i.Ingredient.Name,
                Amount = i.Amount,
            }).ToList(),
            Tags = x.Tags.Select(t => new TagDto
            {
                Name = t.Name
            }).ToList(),
            User = x.User?.UserName ?? "",
            Rating = x.AverageRating,
            RatingCount = x.RatingCount,
        });

        return drinksDto;
    }

    public async Task<IEnumerable<DrinkDto>> Get(ApplicationUser user)
    {
        var drinks = await _context.Drinks
            .Include(d => d.User)
                .ThenInclude(u => u.Favorites)
            .Include(d => d.Ratings)
            .Include(d => d.Tags)
            .Include(d => d.Ingredients)
                .ThenInclude(i => i.Ingredient)
            .Where(d => d.User.UserName == user.UserName)
            .ToListAsync();

        List<Favorite> favorites;
        if (user != null) favorites = _context.Favorites.Where(f => f.UserId == user.Id).ToList();
        else favorites = new List<Favorite>();

        var drinksDto = drinks.Select(x => new DrinkDto
        {
            Id = x.Id,
            Name = x.Name,
            Description = x.Description,
            ImageUrl = x.Image,
            Instructions = x.Instructions,
            Ingredients = x.Ingredients.Select(i => new DrinkIngredientDto
            {
                Name = i.Ingredient.Name,
                Amount = i.Amount,
            }).ToList(),
            Tags = x.Tags.Select(t => new TagDto
            {
                Name = t.Name
            }).ToList(),
            User = x.User?.UserName ?? "",
            Rating = x.AverageRating,
            RatingCount = x.RatingCount,
            IsFavorite = favorites.Any(f => f.DrinkId == x.Id),
            IsOwned = x.User?.UserName == user?.UserName ? true : false,
            CurrentUserRating = x.Ratings.FirstOrDefault(r => r.UserId == user?.Id)?.Value ?? null,
            Created = x.CreatedAt
        });

        return drinksDto;
    }

    public async Task<DrinkDto> Get(string id)
    {
        var drink = await _context.Drinks
            .Include(d => d.User)
                .ThenInclude(u => u.Favorites)
            .Include(d => d.Ratings)
            .Include(d => d.Tags)
            .Include(d => d.Ingredients)
                .ThenInclude(i => i.Ingredient)
            .FirstOrDefaultAsync(d => d.Id == Guid.Parse(id));

        if (drink == null)
        {
            return null;
        }

        var isLoggedIn = _httpContextAccessor.HttpContext.User.Identity.IsAuthenticated;
        List<Favorite> favorites;
        ApplicationUser currentUser;

        if (isLoggedIn)
        {
            currentUser = await _userManager.FindByNameAsync(_httpContextAccessor.HttpContext.User.Identity.Name);
            favorites = _context.Favorites.Where(f => f.UserId == currentUser.Id).ToList();
        }
        else
        {
            favorites = new List<Favorite>();
            currentUser = null;
        }

        var drinkDto = new DrinkDto
        {
            Id = drink.Id,
            Name = drink.Name,
            Description = drink.Description,
            ImageUrl = drink.Image,
            Instructions = drink.Instructions,
            Ingredients = drink.Ingredients.Select(i => new DrinkIngredientDto
            {
                Name = i.Ingredient.Name,
                Amount = i.Amount,
            }).ToList(),
            Tags = drink.Tags.Select(t => new TagDto
            {
                Name = t.Name
            }).ToList(),
            User = drink.User?.UserName ?? "",
            Rating = drink.AverageRating,
            RatingCount = drink.RatingCount,
            IsFavorite = favorites.Any(f => f.DrinkId == drink.Id) ? true : false,
            CurrentUserRating = drink.Ratings.FirstOrDefault(r => r.UserId == currentUser?.Id)?.Value ?? null,
            IsOwned = drink.User.UserName == currentUser?.UserName ? true : false,
        };

        return drinkDto;
    }

    public async Task<Drink> Post(CreateDrinkRequest drinkDto)
    {
        var imgUrl = await _mediaService.Save(drinkDto.Image);

        var drink = new Drink
        {
            Name = drinkDto.Name,
            Description = drinkDto.Description,
            Image = imgUrl,
            Instructions = drinkDto.Instructions,
            Tags = drinkDto.Tags.Select(t => new Tag
            {
                Name = t.Name
            }).ToList(),
            Ingredients = drinkDto.Ingredients.Select(i => new DrinkIngredient
            {
                Ingredient = new Ingredient
                {
                    Name = i.Name
                },
                Amount = i.Amount
            }).ToList(),
            User = await _userManager.FindByNameAsync(_httpContextAccessor.HttpContext.User.Identity.Name)
        };

        _context.Drinks.Add(drink);
        await _context.SaveChangesAsync();

        return drink;
    }

    public async Task Put(string id, DrinkDto drinkDto)
    {
        if (id != drinkDto.Id.ToString())
        {
            return;
        }

        var drink = await _context.Drinks.FindAsync(Guid.Parse(id));
        if (drink == null)
        {
            return;
        }

        drink.Name = drinkDto.Name;
        drink.Description = drinkDto.Description;
        drink.Image = drinkDto.ImageUrl;
        drink.Instructions = drinkDto.Instructions;
        drink.Tags = drinkDto.Tags.Select(t => new Tag
        {
            Name = t.Name
        }).ToList();
        drink.Ingredients = drinkDto.Ingredients.Select(i => new DrinkIngredient
        {
            Ingredient = new Ingredient
            {
                Name = i.Name
            },
            Amount = i.Amount
        }).ToList();

        _context.Entry(drink).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return;
    }

    public async Task Delete(string id)
    {
        var drink = await _context.Drinks.Where(d => d.Id == Guid.Parse(id))
            .AsNoTracking().FirstOrDefaultAsync();
        if (drink == null)
        {
            return;
        }

        // should only delete drink row and nothing else
        _context.Drinks.Remove(drink).State = EntityState.Deleted;
        await _context.SaveChangesAsync();
    }

    public async Task<List<DrinkDto>> GetFavorites()
    {
        var currentUser = await _userManager.FindByNameAsync(_httpContextAccessor.HttpContext.User.Identity.Name);
        var favorites = _context.Favorites
            .Include(f => f.Drink)
                .ThenInclude(d => d.User)
            .Include(f => f.Drink)
                .ThenInclude(d => d.Ratings)
            .Include(f => f.Drink)
                .ThenInclude(d => d.Tags)
            .Include(f => f.Drink)
                .ThenInclude(d => d.Ingredients)
                    .ThenInclude(i => i.Ingredient)
            .Include(f => f.User)
            .Where(f => f.UserId == currentUser.Id).ToList();


        var drinksDto = favorites.Select(x => new DrinkDto
        {
            Id = x.Drink.Id,
            Name = x.Drink.Name,
            Description = x.Drink.Description,
            ImageUrl = x.Drink.Image,
            Instructions = x.Drink.Instructions,
            Ingredients = x.Drink.Ingredients.Select(i => new DrinkIngredientDto
            {
                Name = i.Ingredient.Name,
                Amount = i.Amount,
            }).ToList(),
            Tags = x.Drink.Tags.Select(t => new TagDto
            {
                Name = t.Name
            }).ToList(),
            User = x.User?.UserName ?? "",
            Rating = x.Drink.AverageRating,
            RatingCount = x.Drink.RatingCount,
            IsFavorite = favorites.Any(f => f.DrinkId == x.Id),
            CurrentUserRating = x.Drink.Ratings.FirstOrDefault(r => r.UserId == currentUser?.Id)?.Value ?? null,
            IsOwned = x.User.UserName == currentUser?.UserName ? true : false,
            Created = x.Drink.CreatedAt,
        });

        return drinksDto.ToList();
    }

    public async Task<bool> Rate(string id, int rating)
    {
        var drink = await _context.Drinks
            .Include(d => d.Ratings)
            .FirstOrDefaultAsync(d => d.Id == Guid.Parse(id));

        if (drink == null)
        {
            return false;
        }

        var currentUser = await _userManager.FindByNameAsync(_httpContextAccessor.HttpContext.User.Identity.Name);
        var userRating = drink.Ratings.FirstOrDefault(r => r.UserId == currentUser.Id);

        if (userRating == null)
        {
            drink.Ratings.Add(new Rating
            {
                DrinkId = drink.Id,
                UserId = currentUser.Id,
                Value = rating
            });
        }
        else
        {
            userRating.Value = rating;
        }

        await _context.SaveChangesAsync();

        return true;
    }
}