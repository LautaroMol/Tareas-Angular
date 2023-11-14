import { Component, OnInit } from '@angular/core';
import { Tarea } from './Interface/tarea';
import { TareaService } from './Service/tarea.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { TareaComponentComponent } from './tarea-component/tarea-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private tareaService: TareaService) {}
  listaTareas: Tarea[] = [];
  ngOnInit() {
    this.obtenerListaTareas();
  }

  obtenerListaTareas() {
    this.tareaService.getList().subscribe(
      (tareas: Tarea[]) => {
        this.listaTareas = tareas;
      },
      (error) => {
        console.error('Error al obtener la lista de tareas', error);
      }
    );}
}
