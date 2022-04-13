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
            var result = await _repository.LoginUser(body);
            if (result)
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPut]
        public async Task<ActionResult<object>> Logout([FromBody] DateTime clockInTime, [FromRoute] int id)
        {
            await _repository.LogUserOut(id, clockInTime);
            return Ok();
        }
    }
}
