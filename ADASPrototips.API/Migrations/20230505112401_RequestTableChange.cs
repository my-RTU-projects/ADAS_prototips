using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ADASPrototips.API.Migrations
{
    /// <inheritdoc />
    public partial class RequestTableChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AutoPartsRequestComponents_AutoParts_AutoPartId",
                table: "AutoPartsRequestComponents");

            migrationBuilder.DropIndex(
                name: "IX_AutoPartsRequestComponents_AutoPartId",
                table: "AutoPartsRequestComponents");

            migrationBuilder.DropColumn(
                name: "AutoPartId",
                table: "AutoPartsRequestComponents");

            migrationBuilder.AddColumn<string>(
                name: "AutoPartProductNumber",
                table: "AutoPartsRequestComponents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AutoPartProductNumber",
                table: "AutoPartsRequestComponents");

            migrationBuilder.AddColumn<int>(
                name: "AutoPartId",
                table: "AutoPartsRequestComponents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AutoPartsRequestComponents_AutoPartId",
                table: "AutoPartsRequestComponents",
                column: "AutoPartId");

            migrationBuilder.AddForeignKey(
                name: "FK_AutoPartsRequestComponents_AutoParts_AutoPartId",
                table: "AutoPartsRequestComponents",
                column: "AutoPartId",
                principalTable: "AutoParts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
