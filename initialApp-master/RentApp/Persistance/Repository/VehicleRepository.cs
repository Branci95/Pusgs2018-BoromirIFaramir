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
            RADBContext db = new RADBContext();
            List<Vehicle> vehicle = new List<Vehicle>(db.Vehicles);
            vehicle = new List<Vehicle>(vehicle.OrderBy(s => s.Id).Skip((pageIndex - 1) * pageSize).Take(pageSize));

            return vehicle;
        }

        protected RADBContext RADBContext { get { return context as RADBContext; } }
    }
}