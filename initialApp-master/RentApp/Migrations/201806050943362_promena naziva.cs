namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class promenanaziva : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Branches", name: "Service_Id", newName: "Services_Id");
            RenameColumn(table: "dbo.Vehicles", name: "Service_Id", newName: "Services_Id");
            RenameIndex(table: "dbo.Branches", name: "IX_Service_Id", newName: "IX_Services_Id");
            RenameIndex(table: "dbo.Vehicles", name: "IX_Service_Id", newName: "IX_Services_Id");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Vehicles", name: "IX_Services_Id", newName: "IX_Service_Id");
            RenameIndex(table: "dbo.Branches", name: "IX_Services_Id", newName: "IX_Service_Id");
            RenameColumn(table: "dbo.Vehicles", name: "Services_Id", newName: "Service_Id");
            RenameColumn(table: "dbo.Branches", name: "Services_Id", newName: "Service_Id");
        }
    }
}
