namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DodatModelService : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Services", "Owner", c => c.String());
            AddColumn("dbo.Services", "Available", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Services", "Available");
            DropColumn("dbo.Services", "Owner");
        }
    }
}
