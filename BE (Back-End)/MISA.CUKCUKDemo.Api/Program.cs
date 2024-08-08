using MISA.CUKCUKDemo.Core;
using MISA.CUKCUKDemo.Core.Exceptions;
using MISA.CUKCUKDemo.Core.Interfaces;
using MISA.CUKCUKDemo.Core.Services;
using MISA.CUKCUKDemo.Infrastructure.DatabaseContext;
using MISA.CUKCUKDemo.Infrastructure.Interfaces;
using MISA.CUKCUKDemo.Infrastructure.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
Common.ConnectionString = builder.Configuration.GetConnectionString("Database1");
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Config DI:
builder.Services.AddScoped<IEmployeeRepository,EmployeeRepository>();
builder.Services.AddScoped<IEmployeeService,EmployeeService>();
builder.Services.AddScoped<IMISADbContext,MariaDbContext>();

builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));

var app = builder.Build();

app.UseMiddleware<HandleExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
