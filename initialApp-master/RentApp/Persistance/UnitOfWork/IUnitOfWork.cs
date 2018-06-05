using RentApp.Persistance.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentApp.Persistance.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IServicesRepository Services { get; set; }
        IAppUserRepository AppUser { get; set; }
        IBranchRepository Branch { get; set; }
        IRentRepository Rent { get; set; }
        ITypeOfVehicleRepository TypeOfVehicle { get; set; }
        IVehicleRepository Vehicle { get; set; }
        int Complete();
    }
}
