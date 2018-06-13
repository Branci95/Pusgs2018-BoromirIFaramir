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
            Services ser = new Services();

            using (var db = new RADBContext())
            {
                ser = db.Services.Where(c => c.Name.Equals(branch.ServerName)).FirstOrDefault();
            }

            if(ser != null)
            {
                ser.Branches.Add(bra);
            }
            else
            {
                return null;
            }

            using (var db = new RADBContext())
            {
                db.Entry(ser).State = EntityState.Modified;
                db.SaveChanges();
            }

            //na branch ne mapira server id, popraviti to, isti fazon kao ovo gore

            
            unitOfWork.Branch.Add(bra);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = bra.Id }, branch);
        }
        
        [ResponseType(typeof(Branch))]
        public IHttpActionResult DeleteBranch(int id)
        {
            Branch branch = unitOfWork.Branch.Get(id);
            if (branch == null)
            {
                return NotFound();
            }

            unitOfWork.Branch.Remove(branch);
            unitOfWork.Complete();

            return Ok(branch);
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