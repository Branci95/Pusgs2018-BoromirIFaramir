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
using System.Net.Mail;

namespace RentApp.Controllers
{
    public class AppUsersController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public AppUsersController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [Route("api/AppUser/GetAppUserUnAva")]
        [HttpGet]
        public IEnumerable<AppUser> GetAppUserUnAva()
        {
            var retValue = unitOfWork.AppUser.GetAll();
            List<AppUser> TempreturnValue = new List<AppUser>();

            foreach (var item in retValue)
            {
                if (item.Activated == false)
                {
                    TempreturnValue.Add(item);
                }
            }

            return TempreturnValue as IEnumerable<AppUser>;
        }

        [Route("api/AppUser/ActivateUser")]
        [HttpGet]
        public IHttpActionResult ActivateUser(int activate, string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (activate == 1)
            {
                var retValue = unitOfWork.AppUser.GetAll();

                List<AppUser> users = new List<AppUser>();

                users = retValue as List<AppUser>;

                foreach (var item in users)
                {
                    if (item.Email == email)
                    {
                        item.Activated = true;

                        SendMailToUser(email, true);

                        unitOfWork.AppUser.Update(item);

                        break;
                    }
                }
            }

            unitOfWork.Complete();

            return Ok();
        }

        public void SendMailToUser(string email, bool activated)
        {
            if(activated == true)
            {
                /*send positive mail to email adress
                MailMessage mail = new MailMessage("foksfak@gmail.com", email);
                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("foksfak@gmail.com", "nadvoznjak");
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                mail.From = new MailAddress("foksfak@gmail.com");
                mail.To.Add("foksfak@gmail.com");
                mail.Subject = "Account approved";
                mail.Body = "Congratulation";
                try
                {
                    client.Send(mail);
                }
                catch
                {

                }*/
            }
            else
            {
                /*send negative mail to email adress
                MailMessage mail = new MailMessage("foksfak@gmail.com", email);
                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential("foksfak@gmail.com", "nadvoznjak");
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                mail.From = new MailAddress("foksfak@gmail.com");
                mail.To.Add("foksfak@gmail.com");
                mail.Subject = "Account not approved";
                mail.Body = "Im so sorry";
                try
                {
                    client.Send(mail);
                }
                catch
                {

                }*/
            }
        }

        public IEnumerable<AppUser> GetAppUsers()
        {
            var retValue = unitOfWork.AppUser.GetAll();

            List<AppUser> TempretAv = new List<AppUser>();

            List<AppUser> TempreturnValue = new List<AppUser>();

            TempretAv = retValue as List<AppUser>;

            foreach (var item in TempretAv)
            {
                if (item.Activated == false)
                {
                    TempreturnValue.Add(item);
                }
            }

            return TempreturnValue as IEnumerable<AppUser>;
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