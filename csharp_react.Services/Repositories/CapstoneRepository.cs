using csharp_react.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace csharp_react.Services.Repositories
{
    public class CapstoneRepository : ICapstoneRepository
    {
        private readonly CapstoneContext _context;
        public CapstoneRepository(CapstoneContext context)
        {
            _context = context;
        }

        public async Task<object> GetAllItems()
        {
            var items = await _context.Users.ToListAsync();
            Console.Write(items);
            throw new NotImplementedException();
        }
    }
}
