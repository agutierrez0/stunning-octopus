using csharp_react.Data.Models;
using csharp_react.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace csharp_react.Services.Repositories
{
    public interface ICapstoneRepository
    {
        Task<object> GetAllItems();
        Task<object> AddNewItem(ItemBody item);
        Task<object> UpdateItem(ItemBody item);
        Task<object> CreateNewTransaction(TransactionBody transaction);
        Task<bool> LoginUser(LoginBody body);
        Task<object> LogUserOut(int id, DateTime clockInTime);
        Task<object> GetAllTransactions();

        Task<object> DeleteItem(int id);
    }
}
