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
    public class TypeOfVehiclesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public TypeOfVehiclesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<TypeOfVehicle> GetTypeOfVehicles()
        {
            return unitOfWork.TypeOfVehicle.GetAll();
        }

        [ResponseType(typeof(TypeOfVehicle))]
        public IHttpActionResult GetTypeOfVehicle(int id)
        {
            TypeOfVehicle typeOfVehicle = unitOfWork.TypeOfVehicle.Get(id);
            if (typeOfVehicle == null)
            {
                return NotFound();
            }

            return Ok(typeOfVehicle);
        }

        // PUT: api/TypeOfVehicles/5
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTypeOfVehicle(int id, TypeOfVehicle typeOfVehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != typeOfVehicle.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.TypeOfVehicle.Update(typeOfVehicle);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeOfVehicleExists(id))
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

        // POST: api/TypeOfVehicles
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(TypeOfVehicle))]
        public IHttpActionResult PostTypeOfVehicle(TypeOfVehicleBindingModel typeOfVehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var list = unitOfWork.TypeOfVehicle.GetAll();

            foreach (var item in list)
            {
                if (item.Name == typeOfVehicle.Name)
                    return BadRequest("Already is type with this name: " + typeOfVehicle.Name);
            }

            TypeOfVehicle toV = new TypeOfVehicle() { Name = typeOfVehicle.Name, Vehicles = new List<Vehicle>() };

            unitOfWork.TypeOfVehicle.Add(toV);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = toV.Id }, typeOfVehicle);
        }

        // DELETE: api/TypeOfVehicles/5
        [Authorize(Roles = "Admin, Manager")]
        [ResponseType(typeof(TypeOfVehicle))]
        public IHttpActionResult DeleteTypeOfVehicle(int id)
        {
            TypeOfVehicle typeOfVehicle = unitOfWork.TypeOfVehicle.Get(id);
            if (typeOfVehicle == null)
            {
                return NotFound();
            }

            unitOfWork.TypeOfVehicle.Remove(typeOfVehicle);
            unitOfWork.Complete();

            return Ok(typeOfVehicle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TypeOfVehicleExists(int id)
        {
            return unitOfWork.Services.Get(id) != null;
        }
    }
}