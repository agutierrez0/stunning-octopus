using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using csharp_react.Data.Models;
using csharp_react.Services.Repositories;
using csharp_react.Services.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace csharp_react.Controllers
{
    [ApiController]
    [Route("/api/transaction")]
    public class TransactionController : ControllerBase
    {
        private readonly ICapstoneRepository _repository;
        public TransactionController(ICapstoneRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<ActionResult<object>> ProcessTransaction([FromBody] TransactionBody body)
        {
            await _repository.CreateNewTransaction(body);
            return Ok();
        }
    }
}
