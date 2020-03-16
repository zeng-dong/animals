using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Animals.ViewModels
{
    public class ViewData
    {
        public IList<AnimalViewModel> Animals { get; set; }
                
        public IList<string> Species { get; set; }

        public IList<string> Categories { get; set; }
    }
}
