using System;
using System.Collections.Generic;

namespace Mercury.Models
{
    public partial class Notes
    {
        public int NoteId { get; set; }
        public string Date { get; set; }
        public string NoteActive { get; set; }
        public string NoteText { get; set; }
        public string Owner { get; set; }
        public int OwnerId { get; set; }

        public Users OwnerNavigation { get; set; }
    }
}
