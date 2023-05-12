namespace Server.Models
{
    public class Favorite : BaseEntity
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid DrinkId { get; set; }
        public Drink Drink { get; set; }
    }
}