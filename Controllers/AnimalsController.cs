using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Animals.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Animals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimalsController : ControllerBase
    {
        private readonly AnimalsService service;

        public AnimalsController(AnimalsService service)
        {
            this.service = service;
        }

        [HttpGet]
        public ActionResult GetViewData()
        {
            try
            {
                var result = this.service.GetViewData();

                return Ok(new { Succeeded = true, Message = "", ResponseData = result });
            }
            catch (Exception e)
            {
                return BadRequest(new { Succeeded = false, Message = "yell the candidate" });
            }
        }


        [HttpGet("category/{category}")]
        public IEnumerable<string> GetCategorySpecies([FromRoute] string category)
        {
            var result = this.service.GetCategorySpecies(category);
            return result;
        }

        
    }
}