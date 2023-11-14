using BackEndTareas.DTOs;
using BackEndTareas.Models;

namespace BackEndTareas.Services
{
    public interface ITareasService
    {
        Task<List<Tarea>> GetList();
        Task<Tarea> Get(int id);
        Task<Tarea> Add(Tarea tarea);
        Task<bool> update(Tarea tarea);
        Task<bool> delete(Tarea tarea);
    }
}
