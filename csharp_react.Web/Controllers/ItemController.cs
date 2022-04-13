using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using csharp_react.Services.Repositories;
using csharp_react.Services.Models;
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
        public async Task<ActionResult<object>> AddItem([FromBody] ItemBody body)
        {
            var result = await _repository.AddNewItem(body);
            return Ok(new { id = result });
        }

        [HttpGet]
        public async Task<ActionResult<object>> GetItems()
        {
            return await _repository.GetAllItems();
        }

        [HttpPut]
        public async Task<ActionResult<object>> UpdateItems([FromBody] ItemBody body)
        {
            return await _repository.UpdateItem(body);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<object>> DeleteItem([FromRoute] int id)
        {
            return Ok(await _repository.DeleteItem(id));
        }
    }
}
