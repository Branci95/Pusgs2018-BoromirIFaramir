namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddImageAppUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AppUsers", "Logo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AppUsers", "Logo");
        }
    }
}
