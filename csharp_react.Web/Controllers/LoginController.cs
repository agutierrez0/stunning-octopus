using System;
using System.Threading.Tasks;
using csharp_react.Services.Repositories;
using csharp_react.Services.Models;
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
            var (success, isAdmin) = await _repository.LoginUser(body);
            if (success)
            {
                return Ok(isAdmin);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPut]
        public ActionResult Logout()
        {
            //await _repository.LogUserOut(id, clockInTime);
            return Ok();
        }
    }
}
