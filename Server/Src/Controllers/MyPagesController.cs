using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MyPagesController : ControllerBase
{
    private readonly DrinksService _drinksService;
    private readonly UserManager<ApplicationUser> _userManager;

    public MyPagesController(DrinksService drinksService, UserManager<ApplicationUser> userManager)
    {
        _drinksService = drinksService;
        _userManager = userManager;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<DrinkDto>>> Get()
    {
        try
        {
            var drinks = await _drinksService.Get();
            return Ok(drinks);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("mydrinks")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<DrinkDto>>> GetMyDrinks()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        if (user == null)
        {
            return Unauthorized();
        }

        var drinks = await _drinksService.Get(user);

        return Ok(drinks);
    }

    [HttpGet("myfavorites")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<DrinkDto>>> GetMyFavorites()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        if (user == null)
        {
            return Unauthorized();
        }

        var drinks = await _drinksService.GetFavorites();

        return Ok(drinks);
    }
}
