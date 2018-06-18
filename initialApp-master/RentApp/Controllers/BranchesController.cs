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
    public class BranchesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public BranchesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<Branch> GetBranches()
        {
            return unitOfWork.Branch.GetAll();
        }
        
        [ResponseType(typeof(Branch))]
        public IHttpActionResult GetBranch(int id)
        {
            Branch branch = unitOfWork.Branch.Get(id);
            if (branch == null)
            {
                return NotFound();
            }

            return Ok(branch);
        }
        
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBranch(int id, Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != branch.Id)
            {
                return BadRequest();
            }
            
            try
            {
                unitOfWork.Branch.Update(branch);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BranchExists(id))
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
        
        [ResponseType(typeof(Branch))]
        public IHttpActionResult PostBranch(BranchBindingModel branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Branch bra = new Branch() { Address = branch.Adress, Latitude = branch.Latitude, Logo = branch.Logo, Longitude = branch.Longitude };
            var services = unitOfWork.Services.GetAll();
            Services service = new Services();

            foreach (var item in services)
            {
                if (item.Name == branch.ServerName)
                {
                    service = item;
                    break;
                }
            }

            service.Branches.Add(bra);

            unitOfWork.Branch.Add(bra);
            unitOfWork.Services.Update(service);
            unitOfWork.Complete();
            
            return CreatedAtRoute("DefaultApi", new { id = bra.Id }, branch);
        }
        
        [ResponseType(typeof(Branch))]
        public IHttpActionResult DeleteBranch(int id)
        {
            var bra = unitOfWork.Branch.Get(id);

            if (bra == null)
            {
                return NotFound();
            }

            var listOfUsers = unitOfWork.AppUser.GetAll();
            var listOfRents = unitOfWork.Rent.GetAll();

            List<Rent> listRentsDelete = new List<Rent>();
            
            foreach (var r in listOfRents)
            {
                if (r.Branch.Id == bra.Id)
                {
                    if (r.Start <= DateTime.Now && r.End >= DateTime.Now)
                        return BadRequest("Service is in use!");

                    listRentsDelete.Add(r);
                }
            }

            int brojRent = listRentsDelete.Count;

            foreach (var item in listRentsDelete)
            {
                foreach (var item2 in listOfUsers)
                {
                    if (item2.Rents.Contains(item))
                        item2.Rents.Remove(item);
                }
            }

            for (int i = 0; i < brojRent; i++)
            {
                unitOfWork.Rent.Remove(listRentsDelete[i]);
            }

            unitOfWork.Branch.Remove(bra);
            unitOfWork.Complete();

            return Ok(bra);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BranchExists(int id)
        {
            return unitOfWork.Branch.Get(id) != null;
        }
    }
}