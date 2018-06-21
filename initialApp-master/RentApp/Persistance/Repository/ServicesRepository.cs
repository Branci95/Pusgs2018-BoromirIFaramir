using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class ServicesRepository : Repository<Services, int>, IServicesRepository
    {
        public ServicesRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Services> GetAll(int pageIndex, int pageSize)
        {
            RADBContext db = new RADBContext();
            List<Services> service = new List<Services>(db.Services);
            service = new List<Services>(service.OrderBy(s => s.Id).Skip((pageIndex - 1) * pageSize).Take(pageSize));

            return service;
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}