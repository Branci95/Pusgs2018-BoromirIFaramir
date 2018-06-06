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

namespace RentApp.Controllers
{
    public class RentsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public RentsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<Rent> GetRents()
        {
            return unitOfWork.Rent.GetAll();
        }

        [ResponseType(typeof(Rent))]
        public IHttpActionResult GetRent(int id)
        {
            Rent rent = unitOfWork.Rent.Get(id);
            if (rent == null)
            {
                return NotFound();
            }

            return Ok(rent);
        }
        
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRent(int id, Rent rent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rent.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.Rent.Update(rent);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentExists(id))
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
        
        [ResponseType(typeof(Rent))]
        public IHttpActionResult PostRent(Rent rent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.Rent.Add(rent);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = rent.Id }, rent);
        }

        // DELETE: api/Rents/5
        [ResponseType(typeof(Rent))]
        public IHttpActionResult DeleteRent(int id)
        {
            Rent rent = unitOfWork.Rent.Get(id);
            if (rent == null)
            {
                return NotFound();
            }

            unitOfWork.Rent.Remove(rent);
            unitOfWork.Complete();

            return Ok(rent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RentExists(int id)
        {
            return unitOfWork.Rent.Get(id) != null;
        }
    }
}