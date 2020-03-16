using System;

namespace Animals
{
    public class Animal
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public string Details { get; set; }
        public string ImageUrl { get; set; }

        public Guid Id { get; set; }
        public string Species { get; set; }
    }
}
