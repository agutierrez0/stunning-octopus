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
            return true;
        }

        public async Task<object> CreateNewTransaction(TransactionBody transaction)
        {
            var tax = double.Parse(transaction.Total) * .0875;
            var subTotal = double.Parse(transaction.Total) + tax;
            var myObject = new Transactions { EmployeeId = transaction.EmployeeId, Total = transaction.Total, Tax = tax.ToString(), Subtotal = subTotal.ToString(), Time = DateTime.Now };
            await _context.Transactions.AddAsync(myObject);
            await _context.SaveChangesAsync();

            var id = myObject.ID;
            foreach(var item in transaction.Items)
            {
                await _context.TransactionPurchases.AddAsync(new TransactionPurchases { ItemId = item.ItemId, TransactionId = id, ItemQuantity = item.ItemAmount });
                await _context.SaveChangesAsync();
            }

            return true;
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
