using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Animals.ViewModels
{
    public class AnimalViewModel
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public string Details { get; set; }
        public string ImageUrl { get; set; }

        public string Species { get; set; }

        public string Category { get; set; }
    }
}
