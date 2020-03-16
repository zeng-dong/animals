using Animals.Entities;
using Animals.ViewModels;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Animals.Services
{
    public class AnimalsService
    {
        private readonly IAnimalsRepository repository;
        
        public AnimalsService(IAnimalsRepository repo)
        {
            this.repository = repo;
        }

        public IList<AnimalViewModel> GetAll()
        {
            var entities = this.repository.List();
            var vm = Mapper.Map<IList<Animal>, IList<AnimalViewModel>>(entities);
            return vm;
        }

        public IList<AnimalViewModel> GetBySpicies(string species)
        {
            Expression<Func<Animal, bool>> expression = x =>          x.Species == species;
            var entities = this.repository.List(expression);

            var vm = Mapper.Map<IList<Animal>, IList<AnimalViewModel>>(entities);

            return vm;
        }

        public IList<string> GetCategorySpecies(string category)
        {
            return this.repository.ListSpecies(category);
        }

        public IList<string> GetCategories()
        {
            return this.repository.ListCategories();
        }

        public ViewData GetViewData()
        {
            var result = new ViewData();
            result.Animals = GetAll();
            result.Species = result.Animals.Select(x => x.Species).Distinct().OrderBy(x => x).ToList();
            result.Categories = GetCategories();

            return result;
        }

    }
}
