using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Services;

public class SearchService
{
    private readonly DatabaseContext _context;

    public SearchService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<SearchResult>> Search(string query)
    {
        var drinks = await _context.Drinks.Include(d => d.Ingredients).ThenInclude(i => i.Ingredient)
            .Include(d => d.Tags)
            .Include(d => d.User)
            .Where(d => d.Name.Contains(query) ||
            d.Instructions.Contains(query) ||
            d.Tags.Any(t => t.Name.Contains(query)) ||
            d.Ingredients.Any(i => i.Ingredient.Name.Contains(query)))
            .Select(d => new SearchResult
            {
                Id = d.Id,
                Name = d.Name,
                ImageUrl = d.Image,
                Type = "Drink"
            })
            .ToListAsync();

        var Users = await _context.Users
            .Where(u => u.UserName.Contains(query))
            .Select(u => new SearchResult
            {
                Id = Guid.Parse(u.Id),
                Name = u.UserName,
                Type = "User"
            })
            .ToListAsync();

        return drinks.Concat(Users);
    }
}