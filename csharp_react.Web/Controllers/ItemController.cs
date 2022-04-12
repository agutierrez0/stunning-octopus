using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using csharp_react.Data.Models;
using csharp_react.Services.Repositories;
using csharp_react.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace csharp_react.Controllers
{
    [ApiController]
    [Route("/api/item")]
    public class ItemController : ControllerBase
    {
        private readonly ICapstoneRepository _repository;
        public ItemController(ICapstoneRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<ActionResult<object>> AddItem([FromBody] Items body)
        {
            await _repository.AddNewItem(body);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<object>> GetItems()
        {
            return await _repository.GetAllItems();
        }

        [HttpPut]
        public async Task<ActionResult<object>> UpdateItems([FromBody] Items body)
        {
            return await _repository.UpdateItem(body);
        }
    }
}
