using Server.Data;
using Server.Models;

namespace Server.Services;

public class MediaService
{
    private readonly DatabaseContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public MediaService(DatabaseContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<Byte[]> Get(string id)
    {
        var media = await _context.Media.FindAsync(id);
        return media.Data;
    }

    public async Task<string> Save(Byte[] image)
    {
        var img = Image.Load(image);
        img.Mutate(x => x.Resize(700, 700));
        var ms = new MemoryStream();
        img.SaveAsJpeg(ms);
        image = ms.ToArray();

        var media = new Media
        {
            Id = Guid.NewGuid().ToString(),
            Data = image
        };


        await _context.Media.AddAsync(media);
        await _context.SaveChangesAsync();

        var baseUrl = GetBaseUrl(media);

        return $"{baseUrl}/api/media/{media.Id}";
    }

    private string GetBaseUrl(Media media)
    {
        if (_httpContextAccessor?.HttpContext?.Request != null)
        {
            var request = _httpContextAccessor?.HttpContext?.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}{request.PathBase}";
            return baseUrl;
        }

        return "http://192.168.0.15:5001";
    }
}