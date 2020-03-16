using Animals.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Animals.Entities
{
    public class AnimalsDbContext : DbContext
    {
        public AnimalsDbContext(DbContextOptions<AnimalsDbContext> options) : base(options)
        {

        }

        public DbSet<Animal> Animals { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var bears = BearData.Bears.ToList();
            bears.ForEach(x => { x.Id = Guid.NewGuid(); x.Species = "Bear"; });
            var cats = CatData.Cats.ToList();
            cats.ForEach(x => { x.Id = Guid.NewGuid(); x.Species = "Cat"; });
            var dogs = DogData.Dogs.ToList();
            dogs.ForEach(x => { x.Id = Guid.NewGuid(); x.Species = "Dog"; });
            var elephants = ElephantData.Elephants.ToList();
            elephants.ForEach(x => { x.Id = Guid.NewGuid(); x.Species = "Elephant"; });
            var monkeys = MonkeyData.Monkeys.ToList();
            monkeys.ForEach(x => { x.Id = Guid.NewGuid(); x.Species = "Monkey"; });

            var animals = bears.Concat(cats).Concat(dogs).Concat(elephants).Concat(monkeys)
                .ToArray();

            modelBuilder.Entity<Animal>().HasData(animals);
            modelBuilder.Entity<Category>().HasData(
                new Category()
                {
                    Id = Guid.NewGuid(),
                    Name = "Domestic",
                    Species = "Dog",
                },
                new Category()
                {
                    Id = Guid.NewGuid(),
                    Name = "Domestic",
                    Species = "Cat",
                }
            );
            
            base.OnModelCreating(modelBuilder);
        }

    }
}
