namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DodaoOcenu : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Services", "Grade", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Services", "Grade");
        }
    }
}
