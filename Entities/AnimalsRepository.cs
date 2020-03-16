using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Animals.Entities
{
    public class AnimalsRepository : IAnimalsRepository
    {
        private readonly AnimalsDbContext context;
        public AnimalsRepository(AnimalsDbContext context)
        {
            this.context = context;
        }

        public Animal Get(Guid id)
        {
            var result = this.context.Animals.FirstOrDefault(x => x.Id == id);
            return result;
        }

        public IList<Animal> List()
        {
            var result = this.context.Animals.OrderBy(x=>x.Species).ThenBy(x=>x.Name).ToList();
            return result;
        }

        public IList<Animal> List(Expression<Func<Animal, bool>> expression)
        {
            var result = this.context.Animals.Where(expression).ToList();
            return result;
        }

        public IList<string> ListCategories()
        {
            var result = this.context.Categories
                .Select(x => x.Name).Distinct().ToList();
            return result;
        }

        public IList<string> ListSpecies(string category)
        {
            var result = this.context.Categories
                .Where(x => String.Equals(x.Name, category))
                .Select(x => x.Species).ToList();
            return result;
        }

        public IList<string> ListSpecies()
        {
            var result = this.context.Animals                
                .Select(x => x.Species).Distinct().ToList();
            return result;
        }
    }
}
