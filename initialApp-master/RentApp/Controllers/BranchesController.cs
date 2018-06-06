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
        public IHttpActionResult PostBranch(Branch branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.Branch.Add(branch);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = branch.Id }, branch);
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