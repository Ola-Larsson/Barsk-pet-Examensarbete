using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Services;

public class DrinksService
{
    private readonly DatabaseContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;

    public DrinksService(DatabaseContext context,
        IHttpContextAccessor httpContextAccessor,
        UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
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

        var currentUser = await _userManager.FindByNameAsync(_httpContextAccessor.HttpContext.User.Identity.Name);

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
            IsFavorite = currentUser?.Favorites.Any(f => f.Id == x.Id) ?? false,
            IsOwned = x.User?.UserName == currentUser?.UserName ? 1 : 0,
            CurrentUserRating = x.Ratings.FirstOrDefault(r => r.UserId == currentUser?.Id)?.Value ?? null
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

        var currentUser = await _userManager.FindByNameAsync(_httpContextAccessor.HttpContext.User.Identity.Name);

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
            IsFavorite = currentUser?.Favorites.Any(f => f.DrinkId == drink.Id) ?? false,
            CurrentUserRating = drink.Ratings.FirstOrDefault(r => r.UserId == currentUser?.Id)?.Value ?? null,
            IsOwned = drink.User.UserName == currentUser?.UserName ? 1 : 0,
        };

        return drinkDto;
    }

    public async Task<Drink> Post(Drink drink)
    {
        _context.Drinks.Add(drink);
        await _context.SaveChangesAsync();

        return drink;
    }

    public async Task Put(string id, Drink drink)
    {
        if (id != drink.Id.ToString())
        {
            return;
        }

        _context.Entry(drink).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return;
    }

    public async Task Delete(string id)
    {
        var drink = await _context.Drinks.FindAsync(id);
        if (drink == null)
        {
            return;
        }

        _context.Drinks.Remove(drink);
        await _context.SaveChangesAsync();

        return;
    }
}