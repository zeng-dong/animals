using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Animals.Entities
{
    public interface IAnimalsRepository
    {
        //Animal Get(Guid id);

        IList<Animal> List();
        
        IList<Animal> List(Expression<Func<Animal, bool>> expression);

        IList<string> ListSpecies(string category);

        IList<string> ListSpecies();

        IList<string> ListCategories();
    }
}
