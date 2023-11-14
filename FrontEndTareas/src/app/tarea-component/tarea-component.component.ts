import { Component,Input } from '@angular/core';
import { Tarea } from '../Interface/tarea';
import { trigger, state, style, transition, animate } from '@angular/animations';


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
  constructor() {
    this.tarea = {} as Tarea;
  }
  
  @Input() tarea: Tarea ;
  mostrarDetalles: boolean = false;

  toggleDetails() {
    this.mostrarDetalles = !this.mostrarDetalles;
  }
}
