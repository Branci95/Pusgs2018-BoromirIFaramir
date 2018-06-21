using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class Services
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public double Grade { get; set; }
        public virtual List<string> UsersGrade { get; set; }
        public virtual List<Vehicle> Vehicles { get; set; }
        public virtual List<Branch> Branches { get; set; }
    }
}