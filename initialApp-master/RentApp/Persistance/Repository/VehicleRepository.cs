using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RentApp.Persistance.Repository
{
    public class VehicleRepository : Repository<Vehicle, int>, IVehicleRepository
    {
        public VehicleRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Vehicle> GetAll(int pageIndex, int pageSize)
        {
            return RADBContext.Vehicles.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}