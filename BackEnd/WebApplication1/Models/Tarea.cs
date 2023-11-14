using System;
using System.Collections.Generic;

namespace BackEndTareas.Models;

public partial class Tarea
{
    public int IdTarea { get; set; }

    public string? NombreTarea { get; set; }

    public string? Descripcion { get; set; }

    public string? Estado { get; set; }

    public DateTime? FechaLimite { get; set; }
}
