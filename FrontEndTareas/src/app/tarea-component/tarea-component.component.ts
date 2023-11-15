import { Component,Input } from '@angular/core';
import { Tarea } from '../Interface/tarea';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { DialogaddeditComponent } from '../Modals/dialogaddedit/dialogaddedit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DialogoDeleteComponent } from '../Modals/dialogo-delete/dialogo-delete.component';
import { TareaService } from '../Service/tarea.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-tarea-component',
  templateUrl: './tarea-component.component.html',
  template: `
    <mat-card [ngClass]="{'finalizada': tarea.estado === 'finalizada', 'en-curso': tarea.estado === 'en_curso', 'vencida': tarea.estado === 'vencida'}">
      <mat-card-header>
        <mat-card-title>{{ tarea.nombre }}</mat-card-title>
      </mat-card-header>
    </mat-card>
  `,
  styleUrls: ['./tarea-component.component.css'],
  animations: [
    trigger('detallesAnimation', [
      state('inactivo', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden',
      })),
      state('activo', style({
        height: '*',
        opacity: 1,
      })),
      transition('inactivo <=> activo', animate('300ms ease-in-out')),
    ]),
  ],
  
})
export class TareaComponentComponent {
  constructor(
    public dialog: MatDialog,
    matCard: MatCardModule,
    private _tareaServicio: TareaService,
    private _snackBar: MatSnackBar,
  ) {
    this.tarea = {} as Tarea;
  }

  listaTareas: Tarea[] = [];
  @Input() tarea: Tarea ;
  mostrarDetalles: boolean = false;

  toggleDetails() {
    this.mostrarDetalles = !this.mostrarDetalles;
  }

  editarTarea(dataTarea: Tarea){
    this.dialog.open(DialogaddeditComponent,{disableClose: true, width:"350px",
  data: dataTarea})
  .afterClosed().subscribe(resultado => {
    if(resultado === "Actualizado"){this.obtenerListaTareas();}
  });
  }
  MostrarAlerta(msg: string, accion: string){
    this._snackBar.open(msg, accion,{
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }
  borrarTarea(dataTarea: Tarea){
    this.dialog.open(DialogoDeleteComponent,{disableClose:true,
    data: dataTarea})
    .afterClosed().subscribe( resultado => {
      if (resultado ==="eliminar"){
        this._tareaServicio.delete(dataTarea.idTarea).subscribe({
          next:(data) => {
            this.MostrarAlerta("La Tarea fue borrada","listo");
            this.obtenerListaTareas();
          },error:(e) => {console.log(e)}
        })
      }
    })
  }

  obtenerListaTareas() {
    this._tareaServicio.getList().subscribe(
      (tareas: Tarea[]) => {
        this.listaTareas = tareas;
        this._tareaServicio.actualizarListaTareas(tareas);
      },
      (error) => {
        console.error('Error al obtener la lista de tareas', error);
      }
    );
  }

  marcarComoFinalizada(tarea: Tarea) {
    // Actualiza el estado localmente
    tarea.estado = 'finalizada';
  
    // Llama al servicio para actualizar el estado en la base de datos
    this._tareaServicio.update(tarea.idTarea, tarea).subscribe({
      next: (data) => {
        console.log(`Estado de la tarea ${tarea.idTarea} actualizado a finalizada en la base de datos.`);
      },
      error: (e) => {
        console.error(`Error al actualizar el estado de la tarea ${tarea.idTarea} en la base de datos.`, e);
      }
    });
  }

  restaurarTarea(tarea: Tarea) {
    // Actualiza el estado localmente
    tarea.estado = 'en curso';
  
    // Llama al servicio para actualizar el estado en la base de datos
    this._tareaServicio.update(tarea.idTarea, tarea).subscribe({
      next: (data) => {
        console.log(`Estado de la tarea ${tarea.idTarea} restaurado a en curso en la base de datos.`);
      },
      error: (e) => {
        console.error(`Error al restaurar el estado de la tarea ${tarea.idTarea} en la base de datos.`, e);
      }
    });
  }

}
