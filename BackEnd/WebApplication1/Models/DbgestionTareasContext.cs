using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BackEndTareas.Models;

public partial class DbgestionTareasContext : DbContext
{
    public DbgestionTareasContext()
    {
    }

    public DbgestionTareasContext(DbContextOptions<DbgestionTareasContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Tarea> Tareas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tarea>(entity =>
        {
            entity.HasKey(e => e.IdTarea).HasName("PK__Tareas__EADE9098418D3D5A");

            entity.Property(e => e.Descripcion)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValueSql("('Pendiente')")
                .HasColumnName("estado");
            entity.Property(e => e.FechaLimite).HasColumnType("date");
            entity.Property(e => e.NombreTarea)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
