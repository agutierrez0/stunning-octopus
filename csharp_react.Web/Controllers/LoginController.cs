using System;
using System.Threading.Tasks;
using csharp_react.Services.Repositories;
using csharp_react.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace csharp_react.Controllers
{
    [ApiController]
    [Route("/api/login")]
    public class LoginController : ControllerBase
    {
        private readonly ICapstoneRepository _repository;
        public LoginController(ICapstoneRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<ActionResult<object>> LoginUser([FromBody] LoginBody body)
        {
            Console.WriteLine(body.EmployeeId);
            Console.WriteLine(body.Passcode);
            return NotFound();
        }
    }
}
