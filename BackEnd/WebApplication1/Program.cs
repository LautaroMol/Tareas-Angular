using BackEndTareas.Models;
using Microsoft.EntityFrameworkCore;
using BackEndTareas.DTOs;
using BackEndTareas.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DbgestionTareasContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("CadenaSQL"));
});
builder.Services.AddScoped<ITareasService, TareaService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Nueva_Politica", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

#region peticiones API REST
app.MapGet("/tarea/lista", async ( ITareasService _TareaService) =>
{
    var listaTarea = await _TareaService.GetList();
    if (listaTarea.Count > 0) return Results.Ok(listaTarea);
    else return Results.NotFound();
});

app.MapPost("/tarea/guardar", async
    (ITareasService _tareaService, Tarea modelo) =>
{ 
    var _tareaCreada = await _tareaService.Add(modelo);
    if (_tareaCreada.IdTarea!=0 ) return Results.Ok(_tareaCreada); else return Results.NotFound();
});

app.MapPut("tarea/actualizar/{idTarea}", async (
    int idTarea,
    ITareasService _tareaService,
    TareaDTO tareadto) =>
{
    var _encontrado = await _tareaService.Get(idTarea);
    if(_encontrado is null) return Results.NotFound();
    _encontrado.NombreTarea = tareadto.NombreTarea;
    _encontrado.Estado = tareadto.Estado;
    _encontrado.FechaLimite = tareadto.FechaLimite;
    _encontrado.Descripcion = tareadto.Descripcion;
    var respuesta = await _tareaService.update(_encontrado);
    if (respuesta) return Results.Ok(_encontrado);
    else return Results.NotFound();
});

app.MapDelete("/tarea/eliminar/{idTarea}", async (
    int idTarea,
    ITareasService _tareaService) =>
{
    var _encontrado = await _tareaService.Get(idTarea);
    if (_encontrado is null) return Results.NotFound();
    var respuesta = await _tareaService.delete(_encontrado);
    if (respuesta) return Results.Ok(_encontrado);
    else { return Results.NotFound(); }
});

#endregion
app.UseCors("Nueva_Politica");
app.Run();

