using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.AllowAnyOrigin()       // Allows requests from any origin
           .AllowAnyMethod()       // Allows any HTTP method (GET, POST, PUT, DELETE, etc.)
           .AllowAnyHeader();      // Allows any HTTP headers
});

app.UseAuthorization();

app.MapControllers();

app.MapGet("/governors", () => {
    return Results.Ok(governors);
});

app.MapGet("/colonies", () => {
    return Results.Ok(colonies);
});

app.Run(); 