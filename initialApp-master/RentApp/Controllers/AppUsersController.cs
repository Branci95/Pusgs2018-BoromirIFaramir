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
    public class AppUsersController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public AppUsersController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<AppUser> GetAppUsers()
        {
            return unitOfWork.AppUser.GetAll();
        }

        [ResponseType(typeof(AppUser))]
        public IHttpActionResult GetAppUser(int id)
        {
            AppUser appUser = unitOfWork.AppUser.Get(id);
            if (appUser == null)
            {
                return NotFound();
            }

            return Ok(appUser);
        }
        
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAppUser(int id, AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != appUser.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.AppUser.Update(appUser);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppUserExists(id))
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
        
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult PostAppUser(AppUser appUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.AppUser.Add(appUser);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = appUser.Id }, appUser);
        }
        
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult DeleteAppUser(int id)
        {
            AppUser appUser = unitOfWork.AppUser.Get(id);
            if (appUser == null)
            {
                return NotFound();
            }

            unitOfWork.AppUser.Remove(appUser);
            unitOfWork.Complete();

            return Ok(appUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AppUserExists(int id)
        {
            return unitOfWork.AppUser.Get(id) != null;
        }
    }
}