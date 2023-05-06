using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ADASPrototips.API.Data;

public class DatabaseContext : DbContext
{
    public DbSet<AutoPart> AutoParts { get; set; }
    public DbSet<AutoPartsRequest> AutoPartsRequests { get; set; }
    public DbSet<AutoPartsRequestComponent> AutoPartsRequestComponents { get; set; }
    public DbSet<Car> Cars { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<ClientOrder> ClientOrders { get; set; }
    public DbSet<JobApplicant> JobApplicants { get; set; }
    public DbSet<JobPosition> JobPositions { get; set; }
    public DbSet<JobVacancy> JobVacancies { get; set; }
    public DbSet<Worker> Workers { get; set; }

    public DatabaseContext (DbContextOptions<DatabaseContext> options) : base(options) {}
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=adas-prototips-db;Database=ADASPrototips;Trusted_Connection=False; User Id=sa;Password=Ad@sPr0t0tip$;TrustServerCertificate=True");
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}