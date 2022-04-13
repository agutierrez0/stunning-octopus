using csharp_react.Data.Models;
using csharp_react.Services.Models;
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
            await _context.Items.AddAsync(item);
            await _context.SaveChangesAsync();
            return new { ok = true };
        }

        public async Task<object> CreateNewTransaction(Transactions transactions)
        {
            await _context.Transactions.AddAsync(transactions);
            await _context.SaveChangesAsync();
            return new { ok = true };
        }

        public async Task<object> GetAllItems()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<bool> LoginUser(LoginBody body)
        {
            var matchingUser = await _context.Users.FirstOrDefaultAsync(c => c.EmployeeId == body.EmployeeId);
            return matchingUser != null && matchingUser.Passcode == body.Passcode;
        }

        public async Task<object> LogUserOut(int id, DateTime clockInTime)
        {
            await _context.EmployeeHours.AddAsync(new EmployeeHours {  ClockInTime = clockInTime, ClockOutTime = DateTime.Now, EmployeeId = id });
            return 1;
        }

        public Task<object> UpdateItem(Items item)
        {
            throw new NotImplementedException();
        }
    }
}
