using KanbanApp.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KanbanApp.Server.Data
{
    public class KanbanDbContext : IdentityDbContext<IdentityUser>
    {
        public KanbanDbContext(DbContextOptions<KanbanDbContext> options) : base(options) { }

        public DbSet<KanbanTask> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<KanbanTask>()
                .Property(t => t.UserId)
                .IsRequired(false); 
        }
    }
}
