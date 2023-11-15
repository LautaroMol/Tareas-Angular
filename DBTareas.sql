Create database DBGestionTareas

use DBGestionTareas

create table Tareas(
IdTarea int primary key identity,
NombreTarea varchar(50),
Descripcion varchar(500),
estado varchar(20) default 'Pendiente',
FechaLimite Date
)

insert into Tareas values('tarea','descripcion','estado','10/10/2010')