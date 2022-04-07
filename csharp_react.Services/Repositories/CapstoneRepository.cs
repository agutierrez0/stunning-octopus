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

        public async Task<object> AddNewItem(Items item)
        {
            await _context.AddAsync(item);
            await _context.SaveChangesAsync();
            return new { ok = true };
        }

        public async Task<object> GetAllItems()
        {
            return await _context.Items.ToListAsync();
        }
    }
}
