using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace csharp_react.Services.Models
{
    public class TransactionBody
    {
        public string Total { get; set; }
        public double Tax { get; set; }
        public double SubTotal { get; set; }
        public DateTime Time { get; set; }
        public int EmployeeId { get; set; }
        public ItemQuantity[] Items { get; set; }    
    }
}
