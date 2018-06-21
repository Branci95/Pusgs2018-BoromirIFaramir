using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace RentApp.Controllers
{
    [RoutePrefix("api/Upload")]
    public class UploadController : ApiController
    {
        [Authorize(Roles = "Admin, Manager, AppUser")]
        [Route("user/PostUserImage")]
        [AllowAnonymous]
        public async Task<string> PostUserImage()
        {
            string finalPath = "http://localhost:51680/";
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {

                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 1; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png.");

                            dict.Add("error", message);
                            return dict.ToString();
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {

                            var message = string.Format("Please Upload a file upto 1 mb.");

                            dict.Add("error", message);
                            return dict.ToString();
                        }
                        else
                        {



                            var filePath = HttpContext.Current.Server.MapPath("~/Content/images/" + postedFile.FileName);
                            finalPath = finalPath + "/Content/images/" + postedFile.FileName;
                            postedFile.SaveAs(filePath);

                        }
                    }

                    var message1 = finalPath;
                    return message1; ;
                }
                var res = string.Format("Please Upload a image.");
                dict.Add("error", res);
                return dict.ToString();
            }
            catch (Exception ex)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return dict.ToString();
            }
        }

        [Authorize(Roles = "Admin, Manager, AppUser")]
        [Route("user/PostBranchImage")]
        [AllowAnonymous]
        public async Task<string> PostBranchImage()
        {
            string finalPath = "http://localhost:51680/";
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {

                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 1; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png.");

                            dict.Add("error", message);
                            return dict.ToString();
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {

                            var message = string.Format("Please Upload a file upto 1 mb.");

                            dict.Add("error", message);
                            return dict.ToString();
                        }
                        else
                        {



                            var filePath = HttpContext.Current.Server.MapPath("~/Content/images/" + postedFile.FileName);
                            finalPath = finalPath + "/Content/images/" + postedFile.FileName;
                            postedFile.SaveAs(filePath);

                        }
                    }

                    var message1 = finalPath;
                    return message1; ;
                }
                var res = string.Format("Please Upload a image.");
                dict.Add("error", res);
                return dict.ToString();
            }
            catch (Exception ex)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return dict.ToString();
            }
        }

        [Authorize(Roles = "Admin, Manager, AppUser")]
        [Route("user/PostVehicleImage")]
        [AllowAnonymous]
        public async Task<string> PostVehicleImage()
        {
            string finalPath = "http://localhost:51680/";
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {

                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 1; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png.");

                            dict.Add("error", message);
                            return dict.ToString();
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {

                            var message = string.Format("Please Upload a file upto 1 mb.");

                            dict.Add("error", message);
                            return dict.ToString();
                        }
                        else
                        {



                            var filePath = HttpContext.Current.Server.MapPath("~/Content/images/" + postedFile.FileName);
                            finalPath = finalPath + "/Content/images/" + postedFile.FileName;
                            postedFile.SaveAs(filePath);

                        }
                    }

                    var message1 = finalPath;
                    return message1; ;
                }
                var res = string.Format("Please Upload a image.");
                dict.Add("error", res);
                return dict.ToString();
            }
            catch (Exception ex)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return dict.ToString();
            }
        }
    }
}
