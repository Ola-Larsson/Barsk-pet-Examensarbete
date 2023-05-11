using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FavoritesController : ControllerBase
{
    private readonly FavoritesService _favoritesService;

    public FavoritesController(FavoritesService favoritesService)
    {
        _favoritesService = favoritesService;
    }

    [HttpPost("{id}")]
    [Authorize]
    public async Task<ActionResult<int>> Favorite(Guid id)
    {
        try
        {
            var result = await _favoritesService.Favorite(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<int>> Unfavorite(Guid id)
    {
        try
        {
            var result = await _favoritesService.Unfavorite(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}