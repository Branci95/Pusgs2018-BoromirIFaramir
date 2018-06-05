using RentApp.Persistance.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Unity.Attributes;

namespace RentApp.Persistance.UnitOfWork
{
    public class RADBUnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;

        [Dependency]
        public IServicesRepository Services { get; set; }

        [Dependency]
        public IAppUserRepository AppUser { get; set; }

        [Dependency]
        public IBranchRepository Branch { get; set; }

        [Dependency]
        public IRentRepository Rent { get; set; }

        [Dependency]
        public ITypeOfVehicleRepository TypeOfVehicle { get; set; }

        [Dependency]
        public IVehicleRepository Vehicle { get; set; }

        public RADBUnitOfWork(DbContext context)
        {
            _context = context;
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}