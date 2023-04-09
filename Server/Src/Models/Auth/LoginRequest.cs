using System.ComponentModel.DataAnnotations;

namespace Server.Models.Auth
{
    public class LoginRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}