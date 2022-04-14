using csharp_react.Data.Models;
using csharp_react.Services.Models;
using Microsoft.EntityFrameworkCore;
using System;
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

        public async Task<object> AddNewItem(ItemBody item)
        {
            var newItem = new Items { Name = item.Name, Price = item.Price, Quantity = item.Quantity };
            await _context.Items.AddAsync(newItem);
            await _context.SaveChangesAsync();
            return newItem.ID;
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

                var itemPurchased = await _context.Items.FindAsync(item.ItemId);
                itemPurchased.Quantity -= item.ItemAmount;
                await _context.SaveChangesAsync();
            }

            return true;
        }

        public async Task<object> DeleteItem(int id)
        {
            var deletedEntity = await _context.Items.FindAsync(id);
            try
            {
                _context.Items.Remove(deletedEntity);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                deletedEntity.Quantity = 0;
                await _context.SaveChangesAsync();
            }

            return true;
        }

        public async Task<object> GetAllItems()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<object> GetAllTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        public async Task<(bool success, bool isAdmin)> LoginUser(LoginBody body)
        {
            var matchingUser = await _context.Users.FirstOrDefaultAsync(c => c.EmployeeId == body.EmployeeId);
            if (matchingUser != null && matchingUser.Passcode == body.Passcode)
            {
                return (true, matchingUser.IsAdmin);
            }
            else
            {
                return (false, false);
            }
        }

        public async Task<object> LogUserOut(int id, DateTime clockInTime)
        {
            await _context.EmployeeHours.AddAsync(new EmployeeHours {  ClockInTime = clockInTime, ClockOutTime = DateTime.Now, EmployeeId = id });
            return 1;
        }

        public Task<object> UpdateItem(ItemBody item)
        {
            throw new NotImplementedException();
        }
    }
}
