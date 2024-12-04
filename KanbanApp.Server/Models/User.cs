namespace KanbanApp.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public ICollection<Models.Task> Tasks { get; set; }
    }
}
