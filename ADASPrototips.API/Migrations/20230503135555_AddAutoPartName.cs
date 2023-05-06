using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ADASPrototips.API.Migrations
{
    /// <inheritdoc />
    public partial class AddAutoPartName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AutoParts",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "AutoParts");
        }
    }
}
