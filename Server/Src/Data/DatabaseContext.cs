using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data;

public class DatabaseContext : IdentityDbContext<ApplicationUser>
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    public DbSet<TestObj> Test { get; set; }
    public DbSet<Drink> Drinks { get; set; }
    public DbSet<DrinkIngredient> Ingredients { get; set; }
    public DbSet<Rating> Ratings { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Favorite> Favorites { get; set; }
    public DbSet<Media> Media { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}