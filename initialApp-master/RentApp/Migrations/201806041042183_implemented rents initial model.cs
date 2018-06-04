namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class implementedrentsinitialmodel : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AppUsers", "RentVehicle_Id", "dbo.Rents");
            DropIndex("dbo.AppUsers", new[] { "RentVehicle_Id" });
            AddColumn("dbo.Rents", "AppUser_Id", c => c.Int());
            CreateIndex("dbo.Rents", "AppUser_Id");
            AddForeignKey("dbo.Rents", "AppUser_Id", "dbo.AppUsers", "Id");
            DropColumn("dbo.AppUsers", "RentVehicle_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AppUsers", "RentVehicle_Id", c => c.Int());
            DropForeignKey("dbo.Rents", "AppUser_Id", "dbo.AppUsers");
            DropIndex("dbo.Rents", new[] { "AppUser_Id" });
            DropColumn("dbo.Rents", "AppUser_Id");
            CreateIndex("dbo.AppUsers", "RentVehicle_Id");
            AddForeignKey("dbo.AppUsers", "RentVehicle_Id", "dbo.Rents", "Id");
        }
    }
}
