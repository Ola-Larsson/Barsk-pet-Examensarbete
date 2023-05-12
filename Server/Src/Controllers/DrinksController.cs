using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DrinksController : ControllerBase
{
    private readonly DrinksService _drinksService;

    public DrinksController(DrinksService drinksService)
    {
        _drinksService = drinksService;
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

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Drink>> Post(Drink drink)
    {
        await _drinksService.Post(drink);

        return CreatedAtAction(nameof(Get), new { id = drink.Id }, drink);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Put(string id, Drink drink)
    {
        if (id != drink.Id.ToString())
        {
            return BadRequest();
        }

        await _drinksService.Put(id, drink);

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(string id)
    {
        await _drinksService.Delete(id);

        return NoContent();
    }
}