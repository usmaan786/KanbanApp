using Microsoft.AspNetCore.Mvc;
using KanbanApp.Server.Data;
using KanbanApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace KanbanApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly KanbanDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public TasksController(KanbanDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var tasks = await _context.Tasks.Where(t => t.UserId == userId).ToListAsync();
            return Ok(tasks);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<KanbanTask>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (task.UserId != userId)
            {
                return Forbid();
            }

            return task;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<KanbanTask>> CreateTask([FromBody] CreateTaskDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var task = new KanbanTask
            {
                Title = dto.Title,
                Status = dto.Status,
                UserId = userId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, KanbanTask task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (task.UserId != userId)
            {
                return Forbid();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tasks.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (task.UserId != userId)
            {
                return Forbid();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class CreateTaskDto
    {
        public string Title { get; set; }
        public string Status { get; set; }
    }
}