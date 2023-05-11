using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Data;

namespace Server.Models;

public class FavoritesService
{
    private readonly DatabaseContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;

    public FavoritesService(DatabaseContext context,
        IHttpContextAccessor httpContextAccessor,
        UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }

    public async Task<int> Favorite(Guid id)
    {
        var drink = await _context.Drinks.FindAsync(id);
        var user = await _userManager.FindByNameAsync(_httpContextAccessor.HttpContext.User.Identity.Name);
        var favorite = await _context.Favorites.FirstOrDefaultAsync(f => f.DrinkId == drink.Id && f.UserId == user.Id);

        if (drink == null || user == null || favorite != null)
        {
            return 0;
        }

        _context.Favorites.Add(new Favorite
        {
            DrinkId = drink.Id,
            UserId = user.Id
        });
        return await _context.SaveChangesAsync();
    }

    public async Task<int> Unfavorite(Guid id)
    {
        var drink = await _context.Drinks.FindAsync(id);
        var user = await _userManager.FindByNameAsync(_httpContextAccessor.HttpContext.User.Identity.Name);
        var favorite = await _context.Favorites.FirstOrDefaultAsync(f => f.DrinkId == drink.Id && f.UserId == user.Id);

        if (drink == null || user == null || favorite == null)
        {
            return 0;
        }

        _context.Favorites.Remove(favorite);
        return await _context.SaveChangesAsync();
    }
}