using ADASPrototips.API.Data;
using ADASPrototips.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DatabaseContext>();
builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(
        "Server=adas-prototips-db;Database=ADASPrototips;Trusted_Connection=False; User Id=sa;Password=Ad@sPr0t0tip$;TrustServerCertificate=True"));

var app = builder.Build();

using(var scope = app.Services.CreateScope())
{
    var salesContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
    salesContext.Database.EnsureCreated();
}

app.UseCors(builder => 
{
    builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapGet("api/version", async () => "1.0");

// GET auto parts
app.MapGet("api/autoParts", async ([FromServices] DatabaseContext dbContext) =>
{
    var autoParts = await dbContext.AutoParts
        .AsNoTracking()
        .Select(x => new AutoPartModel
        {
            Id = x.Id,
            Name = x.Name,
            ProductNumber = x.ProductNumber,
            Price = x.Price,
            PurchasePrice = x.PurchasePrice,
            Quantity = x.Quantity
        })
        .ToListAsync();

    return autoParts;
});

app.MapPost("api/autoParts/add", async ([FromServices] DatabaseContext dbContext, [FromBody] AutoPartModel model) =>
{
    dbContext.AutoParts.Add(new AutoPart
    {
        Name = model.Name,
        ProductNumber = model.ProductNumber,
        Price = model.Price,
        PurchasePrice = model.PurchasePrice,
        Quantity = model.Quantity
    });

    await dbContext.SaveChangesAsync();
});

app.MapPost("api/autoParts/edit", async ([FromServices] DatabaseContext dbContext, [FromBody] AutoPartModel model) =>
{
    var existing = await dbContext.AutoParts.FindAsync(model.Id);

    if (existing == null)
        throw new ArgumentException($"Auto part with id = {model.Id} does not exist");

    existing.Name = model.Name;
    existing.ProductNumber = model.ProductNumber;
    existing.Price = model.Price;
    existing.PurchasePrice = model.PurchasePrice;
    existing.Quantity = model.Quantity;

    await dbContext.SaveChangesAsync();
});

app.MapGet(
    "api/autoParts/requests", 
    async ([FromServices] DatabaseContext dbContext) =>
{
    var requests = await dbContext.AutoPartsRequests
        .AsNoTracking()
        .Include(r => r.Components)
        .Select(x => new AutoPartsRequestModel
        {
            Id = x.Id,
            Status = x.Status,
            Justification = x.Justification,
            Components = x.Components.Select(c => new AutoPartsRequestComponentModel
            {
                Id = c.Id,
                AutoPartProductNumber = c.AutoPartProductNumber,
                Quantity = c.Quantity
            }).ToList()
        })
        .ToListAsync();

    return requests;
});
    
app.MapPost(
    "api/autoParts/requests/create", 
    async ([FromServices] DatabaseContext dbContext, [FromBody] AutoPartsRequestModel model) =>
{
    dbContext.AutoPartsRequests.Add(new AutoPartsRequest
    {
        Status = AutoPartsRequestStatus.PROCESSING,
        Justification = model.Justification,
        Components = model.Components.Select(c => new AutoPartsRequestComponent
        {
            AutoPartProductNumber = c.AutoPartProductNumber,
            Quantity = c.Quantity
        }).ToList()
    });

    await dbContext.SaveChangesAsync();
});

app.MapPost(
    "api/autoParts/requests/answer", 
    async ([FromServices] DatabaseContext dbContext, [FromBody] AutoPartsRequestAnswer answer) =>
{
    var existing = await dbContext.AutoPartsRequests.FindAsync(answer.RequestId);

    if (existing == null)
        throw new ArgumentException($"Auto part request with id = {answer.RequestId} does not exist");

    existing.Status = answer.Accepted ? AutoPartsRequestStatus.APPROVED : AutoPartsRequestStatus.REJECTED;

    await dbContext.SaveChangesAsync();
});

app.MapGet(
    "api/clients",
    async ([FromServices] DatabaseContext dbContext) =>
    {
        var clients = await dbContext.Clients
            .AsNoTracking()
            .Include(c => c.Orders)
            .Select(x => new ClientModel
            {
                Id = x.Id,
                Name = x.Name,
                Phone = x.Phone,
                Orders = x.Orders.Select(o => new ClientOrderModel
                {
                    Id = o.Id,
                    ClientId = o.ClientId,
                    Description = o.Description,
                    Bill = o.Bill,
                    Comment = o.Comment,
                    Expenses = o.Expenses
                }).ToList()
            })
            .ToListAsync();

        return clients;
    });

app.MapPost(
    "api/clients/create",
    async ([FromServices] DatabaseContext dbContext, [FromBody] ClientModel model) =>
    {
        dbContext.Clients.Add(new Client
        {
            Name = model.Name,
            Phone = model.Phone
        });

        await dbContext.SaveChangesAsync();
    });

app.MapGet(
    "api/orders",
    async ([FromServices] DatabaseContext dbContext) =>
    {
        var orders = await dbContext.ClientOrders
            .AsNoTracking()
            .Select(x => new ClientOrderModel
            {
                Id = x.Id,
                ClientId = x.ClientId,
                Description = x.Description,
                Bill = x.Bill,
                Comment = x.Comment,
                Expenses = x.Expenses
            })
            .ToListAsync();

        return orders;
    });

app.MapPost(
    "api/orders/create",
    async ([FromServices] DatabaseContext dbContext, [FromBody] ClientOrderModel model) =>
    {
        dbContext.ClientOrders.Add(new ClientOrder
        {
            ClientId = model.ClientId,
            Description = model.Description,
            Bill = model.Bill,
            Comment = model.Comment,
            Expenses = model.Expenses
        });

        await dbContext.SaveChangesAsync();
    });

app.MapPost(
    "api/orders/edit",
    async ([FromServices] DatabaseContext dbContext, [FromBody] ClientOrderModel model) =>
    {
        var existing = await dbContext.ClientOrders.FindAsync(model.Id);

        if (existing == null)
            throw new ArgumentException($"Order with id = {model.Id} does not exist");

        existing.Description = model.Description;
        existing.Bill = model.Bill;
        existing.Comment = model.Comment;
        existing.Expenses = model.Expenses;

        await dbContext.SaveChangesAsync();
    });

app.MapGet(
    "api/jobPositions",
    async ([FromServices] DatabaseContext dbContext) =>
    {
        var positions = await dbContext.JobPositions
            .AsNoTracking()
            .Select(x => new JobPositionModel
            {
                Id = x.Id,
                Name = x.Name
            })
            .ToListAsync();

        return positions;
    });

app.MapPost(
    "api/jobPositions/create",
    async ([FromServices] DatabaseContext dbContext, [FromBody] JobPositionModel model) =>
    {
        dbContext.JobPositions.Add(new JobPosition
        {
            Name = model.Name
        });

        await dbContext.SaveChangesAsync();
    });

app.MapGet(
    "api/vacancies",
    async ([FromServices] DatabaseContext dbContext) =>
    {
        var vacancies = await dbContext.JobVacancies
            .AsNoTracking()
            .Select(x => new JobVacancyModel
            {
                Id = x.Id,
                PositionId = x.PositionId,
                DesiredSkills = x.DesiredSkills
            })
            .ToListAsync();

        return vacancies;
    });

app.MapPost(
    "api/vacancies/create",
    async ([FromServices] DatabaseContext dbContext, [FromBody] JobVacancyModel model) =>
    {
        dbContext.JobVacancies.Add(new JobVacancy
        {
            PositionId = model.PositionId,
            DesiredSkills = model.DesiredSkills
        });

        await dbContext.SaveChangesAsync();
    });

app.MapPost(
    "api/vacancies/edit",
    async ([FromServices] DatabaseContext dbContext, [FromBody] JobVacancyModel model) =>
    {
        var existing = await dbContext.JobVacancies.FindAsync(model.Id);

        if (existing == null)
            throw new ArgumentException($"Order with id = {model.Id} does not exist");

        existing.PositionId = model.PositionId;
        existing.DesiredSkills = model.DesiredSkills;

        await dbContext.SaveChangesAsync();
    });

app.MapGet(
    "api/jobApplicants",
    async ([FromServices] DatabaseContext dbContext) =>
    {
        var applicants = await dbContext.JobApplicants
            .AsNoTracking()
            .Select(x => new JobApplicantModel
            {
                Id = x.Id,
                VacancyId = x.VacancyId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Phone = x.Phone,
                Email = x.Email,
                Skills = x.Skills,
                Salary = x.Salary,
                BirthDay = x.BirthDay,
                Response = x.Response
            })
            .ToListAsync();

        return applicants;
    });

app.MapPost(
    "api/jobApplicants/create",
    async ([FromServices] DatabaseContext dbContext, [FromBody] JobApplicantModel model) =>
    {
        dbContext.JobApplicants.Add(new JobApplicant()
        {
            VacancyId = model.VacancyId,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Phone = model.Phone,
            Email = model.Email,
            Skills = model.Skills,
            Salary = model.Salary,
            BirthDay = model.BirthDay,
            Response = model.Response
        });

        await dbContext.SaveChangesAsync();
    });

app.MapPost(
    "api/jobApplicants/edit",
    async ([FromServices] DatabaseContext dbContext, [FromBody] JobApplicantModel model) =>
    {
        var existing = await dbContext.JobApplicants.FindAsync(model.Id);

        if (existing == null)
            throw new ArgumentException($"Job applicant with id = {model.Id} does not exist");

        existing.VacancyId = model.VacancyId;
        existing.FirstName = model.FirstName;
        existing.LastName = model.LastName;
        existing.Phone = model.Phone;
        existing.Email = model.Email;
        existing.Skills = model.Skills;
        existing.Salary = model.Salary;
        existing.BirthDay = model.BirthDay;
        existing.Response = model.Response;

        await dbContext.SaveChangesAsync();
    });

app.MapGet(
    "api/workers",
    async ([FromServices] DatabaseContext dbContext) =>
    {
        var applicants = await dbContext.Workers
            .AsNoTracking()
            .Select(x => new WorkerModel
            {
                Id = x.Id,
                PositionId = x.PositionId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Phone = x.Phone,
                Email = x.Email,
                Skills = x.Skills,
                Salary = x.Salary,
                BirthDay = x.BirthDay
            })
            .ToListAsync();

        return applicants;
    });

app.MapPost(
    "api/workers/create",
    async ([FromServices] DatabaseContext dbContext, [FromBody] WorkerModel model) =>
    {
        dbContext.Workers.Add(new Worker()
        {
            PositionId = model.PositionId,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Phone = model.Phone,
            Email = model.Email,
            Skills = model.Skills,
            Salary = model.Salary,
            BirthDay = model.BirthDay
        });

        await dbContext.SaveChangesAsync();
    });

app.MapPost(
    "api/workers/edit",
    async ([FromServices] DatabaseContext dbContext, [FromBody] WorkerModel model) =>
    {
        var existing = await dbContext.Workers.FindAsync(model.Id);

        if (existing == null)
            throw new ArgumentException($"Worker with id = {model.Id} does not exist");

        existing.PositionId = model.PositionId;
        existing.FirstName = model.FirstName;
        existing.LastName = model.LastName;
        existing.Phone = model.Phone;
        existing.Email = model.Email;
        existing.Skills = model.Skills;
        existing.Salary = model.Salary;
        existing.BirthDay = model.BirthDay;

        await dbContext.SaveChangesAsync();
    });


app.Run();