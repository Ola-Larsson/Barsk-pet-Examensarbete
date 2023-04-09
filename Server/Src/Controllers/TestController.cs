using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public TestController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestObj>>> Get()
        {
            return await _context.Test.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TestObj>> Get(string id)
        {
            var testObj = await _context.Test.FindAsync(id);

            if (testObj == null)
            {
                return NotFound();
            }

            return testObj;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TestObj>> Post(TestObj testObj)
        {
            _context.Test.Add(testObj);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = testObj.Id }, testObj);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(string id, TestObj testObj)
        {
            if (id != testObj.Id.ToString())
            {
                return BadRequest();
            }

            _context.Entry(testObj).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(string id)
        {
            var testObj = await _context.Test.FindAsync(id);
            if (testObj == null)
            {
                return NotFound();
            }

            _context.Test.Remove(testObj);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}