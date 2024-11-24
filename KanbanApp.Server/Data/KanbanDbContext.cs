using Microsoft.EntityFrameworkCore;

namespace KanbanApp.Server.Data
{
    public class KanbanDbContext : DbContext
    {
        public KanbanDbContext(DbContextOptions<KanbanDbContext> options) : base(options) { }
        public DbSet<Models.Task> Tasks { get; set; }
    }
}
