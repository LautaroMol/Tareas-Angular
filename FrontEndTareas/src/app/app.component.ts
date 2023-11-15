import { Component, OnInit } from '@angular/core';
import { Tarea } from './Interface/tarea';
import { TareaService } from './Service/tarea.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { TareaComponentComponent } from './tarea-component/tarea-component.component';
import { DialogaddeditComponent } from './Modals/dialogaddedit/dialogaddedit.component';
import { MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private tareaService: TareaService,
    public dialog:MatDialog,) {}
  listaTareas: Tarea[] = [];
  ngOnInit() {
    this.obtenerListaTareas(); // Llama a tu método existente para cargar la lista al inicio
    this.tareaService.listaTareas$.subscribe((tareas: Tarea[]) => {
      this.listaTareas = tareas;
    });
  }
  
  filtroNombre = '';

  obtenerListaTareas() {
    this.tareaService.getList().subscribe(
      (tareas: Tarea[]) => {
        // Verificar y actualizar el estado de las tareas
        this.listaTareas = tareas.map(tarea => {
          const fechaActual = new Date();
          const fechaLimite = new Date(tarea.fechaLimite);
          
          // Si la tarea está vencida pero su fecha de vencimiento aún no ha ocurrido, cambiar a "en curso"
          if (tarea.estado === 'vencida' && fechaLimite > fechaActual) {
            tarea.estado = 'en curso';
  
            // Llama al servicio para actualizar el estado en la base de datos
            this.tareaService.update(tarea.idTarea, tarea).subscribe({
              next: (data) => {
                console.log(`Estado de la tarea ${tarea.idTarea} cambiado a "en curso" en la base de datos.`);
              },
              error: (e) => {
                console.error(`Error al actualizar el estado de la tarea ${tarea.idTarea} en la base de datos.`, e);
              }
            });
          }
  
          return tarea;
        });
  
        // Actualizar la lista en el servicio
        this.tareaService.actualizarListaTareas(this.listaTareas);
      },
      (error) => {
        console.error('Error al obtener la lista de tareas', error);
      }
    );
  }
  
  filtroPorNombre(tarea: Tarea): boolean {
    // Lógica de filtro por nombre
    return tarea.nombreTarea.includes(this.filtroNombre);
  }
  crearNuevaTarea(){
    this.dialog.open(DialogaddeditComponent,{disableClose:true,width:"350px"})
    .afterClosed().subscribe(resultado => {
      if(resultado==="Creado"){this.obtenerListaTareas();}
    })
  }
}
