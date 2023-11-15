import { Component,Input } from '@angular/core';
import { Tarea } from '../Interface/tarea';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { DialogaddeditComponent } from '../Modals/dialogaddedit/dialogaddedit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';


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
  ) {
    this.tarea = {} as Tarea;
  }
  
  @Input() tarea: Tarea ;
  mostrarDetalles: boolean = false;

  toggleDetails() {
    this.mostrarDetalles = !this.mostrarDetalles;
  }

  editarTarea(dataTarea: Tarea){
    this.dialog.open(DialogaddeditComponent,{disableClose: true, width:"350px",
  data: dataTarea})
  .afterClosed();
  }
  borrarTarea(dataTarea: Tarea){
    console.log("se apreto eliminar");
  }

}
