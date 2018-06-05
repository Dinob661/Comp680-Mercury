using System;
using System.Collections.Generic;

namespace Mercury.Models
{
    public partial class Messages
    {
        public int MessageId { get; set; }
        public string Date { get; set; }
        public string MsgActive { get; set; }
        public string Owner { get; set; }
        public int OwnerId { get; set; }
        public string Text { get; set; }

        public Users OwnerNavigation { get; set; }
    }
}
