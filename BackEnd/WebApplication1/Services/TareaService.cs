using BackEndTareas.Models;
using BackEndTareas.Services;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace BackEndTareas.Services
{
    public class TareaService : ITareasService
    {
        private DbgestionTareasContext _dbcontext;
        public TareaService(DbgestionTareasContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<List<Tarea>> GetList()
        {
            try
            {
                List<Tarea> list = new List<Tarea>();
                list = await _dbcontext.Tareas.ToListAsync();
                return list;
            }catch (Exception ex) { throw ex; }
        }
        public async Task<Tarea> Get(int id)
        {
            try
            {
                Tarea? encontrada = new Tarea();
                encontrada = await _dbcontext.Tareas.Where(e => e.IdTarea == id).FirstOrDefaultAsync();
                return encontrada;
            }catch (Exception ex) { throw ex; }
        }

        public async Task<Tarea> Add(Tarea tarea)
        {
            try
            {
                _dbcontext.Tareas.Add(tarea);
                await _dbcontext.SaveChangesAsync();
                return tarea;
            }catch (Exception ex) { throw ex; }
        }
        public async Task<bool> update(Tarea tarea)
        {
            try
            {
                _dbcontext.Tareas.Update(tarea);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

        public async Task<bool> delete(Tarea tarea)
        {
            try
            {
                _dbcontext.Tareas.Remove(tarea);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex) { throw ex; }
        }
        
    }
}
