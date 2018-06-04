namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class implementedrentinitialmodel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Rents",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Start = c.DateTime(),
                        End = c.DateTime(),
                        Branch_Id = c.Int(),
                        Vehicle_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Branches", t => t.Branch_Id)
                .ForeignKey("dbo.Vehicles", t => t.Vehicle_Id)
                .Index(t => t.Branch_Id)
                .Index(t => t.Vehicle_Id);
            
            AddColumn("dbo.AppUsers", "RentVehicle_Id", c => c.Int());
            CreateIndex("dbo.AppUsers", "RentVehicle_Id");
            AddForeignKey("dbo.AppUsers", "RentVehicle_Id", "dbo.Rents", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AppUsers", "RentVehicle_Id", "dbo.Rents");
            DropForeignKey("dbo.Rents", "Vehicle_Id", "dbo.Vehicles");
            DropForeignKey("dbo.Rents", "Branch_Id", "dbo.Branches");
            DropIndex("dbo.Rents", new[] { "Vehicle_Id" });
            DropIndex("dbo.Rents", new[] { "Branch_Id" });
            DropIndex("dbo.AppUsers", new[] { "RentVehicle_Id" });
            DropColumn("dbo.AppUsers", "RentVehicle_Id");
            DropTable("dbo.Rents");
        }
    }
}
