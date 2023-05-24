using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaController : ControllerBase
{
    private readonly MediaService _mediaService;

    public MediaController(MediaService mediaService)
    {
        _mediaService = mediaService;
    }

    [HttpGet("{id}")]
    public async Task<FileResult> Get(string id)
    {
        var media = await _mediaService.Get(id);
        return File(media, "image/jpeg");
    }

    [HttpPost]
    public async Task<ActionResult<String>> Post(byte[] image)
    {
        var imageUrl = await _mediaService.Save(image);
        return CreatedAtAction(nameof(Post), new { imageUrl });
    }
}