﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace csharp_react.Data.Models
{
    public partial class Transactions
    {
        public Transactions()
        {
            TransactionPurchases = new HashSet<TransactionPurchases>();
        }

        public int ID { get; set; }
        public string Total { get; set; }
        public string Tax { get; set; }
        public string Subtotal { get; set; }
        public DateTime Time { get; set; }
        public int EmployeeId { get; set; }

        public virtual Users Employee { get; set; }
        public virtual ICollection<TransactionPurchases> TransactionPurchases { get; set; }
    }
}