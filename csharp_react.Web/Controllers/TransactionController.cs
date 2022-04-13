using System.Threading.Tasks;
using csharp_react.Services.Repositories;
using csharp_react.Services.Models;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<ActionResult<object>> GetTransactions()
        {
            return await _repository.GetAllTransactions();
        }
    }
}
