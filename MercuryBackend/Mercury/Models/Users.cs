using System;
using System.Collections.Generic;

namespace Mercury.Models
{
    public partial class Users
    {
        public Users()
        {
            Markers = new HashSet<Markers>();
            Messages = new HashSet<Messages>();
            Notes = new HashSet<Notes>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string UserActive { get; set; }
        public string UserName { get; set; }

        public ICollection<Markers> Markers { get; set; }
        public ICollection<Messages> Messages { get; set; }
        public ICollection<Notes> Notes { get; set; }
    }
}
