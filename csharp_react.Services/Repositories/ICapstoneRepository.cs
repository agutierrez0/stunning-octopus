using csharp_react.Data.Models;
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
        Task<object> AddNewItem(Items item);
        Task<object> UpdateItem(Items item);
        Task<object> CreateNewTransaction(Transactions transactions);
        Task<object> LoginUser(object item);
        Task<object> LogUserOut(int id);
    }
}
