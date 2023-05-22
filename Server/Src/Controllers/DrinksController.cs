using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DrinksController : ControllerBase
{
    private readonly DrinksService _drinksService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly MediaService _mediaService;

    public DrinksController(DrinksService drinksService, UserManager<ApplicationUser> userManager, MediaService mediaService)
    {
        _drinksService = drinksService;
        _userManager = userManager;
        _mediaService = mediaService;
    }

    [HttpGet]
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

    [HttpGet("{id}")]
    public async Task<ActionResult<DrinkDto>> Get(string id)
    {
        var drink = await _drinksService.Get(id);

        if (drink == null)
        {
            return NotFound();
        }

        return Ok(drink);
    }

    [HttpGet("user/{id}")]
    public async Task<ActionResult<UserPageDto>> GetMyDrinks(string id)
    {
        var user = await _userManager.FindByNameAsync(id);
        if (user == null)
        {
            return NoContent();
        }

        var drinks = await _drinksService.Get(user);

        var userPage = new UserPageDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Drinks = drinks.ToList()
        };

        return Ok(userPage);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Drink>> Post(CreateDrinkRequest drink)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        if (user == null)
        {
            return Unauthorized();
        }

        var created = await _drinksService.Post(drink);

        return CreatedAtAction(nameof(Get), new { id = created.Id }, drink);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Put(string id, DrinkDto drinkDto)
    {
        if (id != drinkDto.Id.ToString())
        {
            return BadRequest();
        }

        var drink = await _drinksService.Get(id);

        if (drink == null)
        {
            return NotFound();
        }

        await _drinksService.Put(id, drinkDto);

        return NoContent();
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> Delete([FromBody] string id)
    {
        await _drinksService.Delete(id);

        return NoContent();
    }

    [HttpPost("rating/{id}")]
    [Authorize]
    public async Task<IActionResult> Rate(string id, [FromBody] int rating)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        if (user == null)
        {
            return Unauthorized();
        }

        var drink = await _drinksService.Get(id);

        if (drink == null)
        {
            return NotFound();
        }

        await _drinksService.Rate(id, rating);

        return NoContent();
    }
}