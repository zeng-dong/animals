﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Animals.Entities
{
    public class Category
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Species { get; set; }
    }
}
