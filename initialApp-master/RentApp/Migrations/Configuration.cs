namespace RentApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using RentApp.Models.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.Linq;
    using System.Text;

    internal sealed class Configuration : DbMigrationsConfiguration<RentApp.Persistance.RADBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(RentApp.Persistance.RADBContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Manager"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Manager" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }

            context.AppUsers.AddOrUpdate(

                  u => u.FullName,

                  new AppUser() { FullName = "Admin Adminovic" }

            );

            context.AppUsers.AddOrUpdate(

                p => p.FullName,

                new AppUser() { FullName = "AppUser AppUserovic" }

            );

            /*TypeOfVehicle tov = new TypeOfVehicle();
            tov.Name = "Limunzina";

            TypeOfVehicle tov2 = new TypeOfVehicle();
            tov2.Name = "Dzip";

            Vehicle v1 = new Vehicle();
            v1.Description = "opis1";
            v1.Images = new System.Collections.Generic.List<string>();
            v1.Manufactor = "Opel";
            v1.Model = "Astra";
            v1.PricePerHour = 100;
            v1.Type = tov;
            v1.Year = 1995;

            Vehicle v2 = new Vehicle();
            v2.Description = "opis2";
            v2.Images = new System.Collections.Generic.List<string>();
            v2.Manufactor = "BMW";
            v2.Model = "X6";
            v2.PricePerHour = 200;
            v2.Type = tov2;
            v2.Year = 2015;

            Branch b1 = new Branch();
            b1.Address = "Nenadova 10";
            b1.Latitude = 100;
            b1.Logo = "aaa";
            b1.Longitude = 50;

            Branch b2 = new Branch();
            b2.Address = "Zelenoviceva 10";
            b2.Latitude = 200;
            b2.Logo = "aaa";
            b2.Longitude = 450;

            Service s = new Service();
            s.Email = "service1@gmail.com";
            s.Branches = new System.Collections.Generic.List<Branch>();
            s.Branches.Add(b1);
            s.Branches.Add(b2);
            s.Description = "opisService1";
            s.Logo = "aaa";
            s.Name = "Munja trans";
            s.Vehicles = new System.Collections.Generic.List<Vehicle>();
            s.Vehicles.Add(v1);
            s.Vehicles.Add(v2);

            context.Services.AddOrUpdate(s);*/

            //context.SaveChanges();

            SaveChanges(context);

            var userStore = new UserStore<RAIdentityUser>(context);
            var userManager = new UserManager<RAIdentityUser>(userStore);

            if (!context.Users.Any(u => u.UserName == "admin"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.FullName == "Admin Adminovic");
                var user = new RAIdentityUser() { Id = "admin", UserName = "admin", Email = "admin@yahoo.com", PasswordHash = RAIdentityUser.HashPassword("admin"), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "appu"))

            {

                var _appUser = context.AppUsers.FirstOrDefault(a => a.FullName == "AppUser AppUserovic");
                var user = new RAIdentityUser() { Id = "appu", UserName = "appu", Email = "appu@yahoo.com", PasswordHash = RAIdentityUser.HashPassword("appu"), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");

            }
        }
        private static void SaveChanges(DbContext context)
        {
            try
            {
                context.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                var sb = new StringBuilder();
                foreach (var failure in ex.EntityValidationErrors)
                {
                    sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                    foreach (var error in failure.ValidationErrors)
                    {
                        sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine();
                    }
                }
                throw new DbEntityValidationException(
                    "Entity Validation Failed - errors follow:\n" +
                    sb.ToString(), ex
                );
            }
        }
    }
}
