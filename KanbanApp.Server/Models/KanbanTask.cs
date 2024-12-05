using Microsoft.AspNetCore.Identity;

namespace KanbanApp.Server.Models
{
    public class KanbanTask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string UserId { get; set; }

        //public IdentityUser User { get; set; }
    }
}
