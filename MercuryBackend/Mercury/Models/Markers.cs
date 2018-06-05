using System;
using System.Collections.Generic;

namespace Mercury.Models
{
    public partial class Markers
    {
        public int MarkerId { get; set; }
        public int OwnerId { get; set; }    
        public string MarkerName { get; set; }
        public float Lat { get; set; }
        public float Lng { get; set; }
        public string Bldg { get; set; }
        public string Owner { get; set; }

        public Users OwnerNavigation { get; set; }
    }
}
