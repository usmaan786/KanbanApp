namespace KanbanApp.Server.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

    }
}
