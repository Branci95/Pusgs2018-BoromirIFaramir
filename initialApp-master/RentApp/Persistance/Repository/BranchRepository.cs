using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class BranchRepository : Repository<Branch, int>, IBranchRepository
    {
        public BranchRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Branch> GetAll(int pageIndex, int pageSize)
        {
            return RADBContext.Branches.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}