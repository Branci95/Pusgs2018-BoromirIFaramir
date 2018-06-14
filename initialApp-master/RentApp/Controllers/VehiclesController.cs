using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RentApp.Models.Entities;
using RentApp.Persistance;
using RentApp.Persistance.UnitOfWork;
using RentApp.Models;

namespace RentApp.Controllers
{
    public class VehiclesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public VehiclesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<Vehicle> GetVehicles()
        {
            return unitOfWork.Vehicle.GetAll();
        }

        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(int id)
        {
            Vehicle vehicle = unitOfWork.Vehicle.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }
        
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(int id, Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle.Id)
            {
                return BadRequest();
            }
            
            try
            {
                unitOfWork.Vehicle.Update(vehicle);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult PostVehicle(VehicleBindingModel vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var typeOfVehicles = unitOfWork.TypeOfVehicle.GetAll();
            TypeOfVehicle toV = new TypeOfVehicle();

            foreach (var item in typeOfVehicles)
            {
                if (item.Name == vehicle.TypeOfVehicle)
                {
                    toV = item;
                    break;
                }
            }

            Vehicle vehi = new Vehicle() { Description = vehicle.Description, Images = new List<string>(), Manufactor = vehicle.Manufactor, Model = vehicle.Model, PricePerHour = vehicle.PricePerHour, Unavailable = false, Year = vehicle.Year, Type = toV };

            toV.Vehicles.Add(vehi);

            var services = unitOfWork.Services.GetAll();
            Services ser = new Services();

            foreach (var item in services)
            {
                if (item.Name == vehicle.ServerName)
                {
                    ser = item;
                    break;
                }
            }

            ser.Vehicles.Add(vehi);

            unitOfWork.Vehicle.Add(vehi);
            unitOfWork.TypeOfVehicle.Update(toV);
            unitOfWork.Services.Update(ser);

            return CreatedAtRoute("DefaultApi", new { id = vehi.Id }, vehicle);          
        }

        // DELETE: api/Vehicles/5
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult DeleteVehicle(int id)
        {
            Vehicle vehicle = unitOfWork.Vehicle.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            unitOfWork.Vehicle.Remove(vehicle);
            unitOfWork.Complete();

            return Ok(vehicle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VehicleExists(int id)
        {
            return unitOfWork.Vehicle.Get(id) != null;
        }
    }
}