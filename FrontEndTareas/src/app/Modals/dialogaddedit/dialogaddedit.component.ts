import { Component,OnInit,Inject, inject } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {MatSnackBar } from '@angular/material/snack-bar';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import * as moment from 'moment';
import { Tarea } from 'src/app/Interface/tarea';
import { TareaService } from 'src/app/Service/tarea.service';
export const MY_DATE_FORMATS ={
  parse:{ dateInput: 'DD/MM/YYYY'},
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    DateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

@Component({
  selector: 'app-dialogaddedit',
  templateUrl: './dialogaddedit.component.html',
  styleUrls: ['./dialogaddedit.component.css'],
  providers:[{
    provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
  }]
})
export class DialogaddeditComponent {
  formTarea: FormGroup;
  tituloAccion:string = "Nuevo";
  botonAccion:string = "Guardar";
  listaTareas:Tarea[]=[];

  constructor(private dialogoReferencia: MatDialogRef<DialogaddeditComponent>,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private _tareaServicio: TareaService,
    @Inject (MAT_DIALOG_DATA) public dataTarea: Tarea){
      this.formTarea = this.fb.group({
        nombreTarea:['',Validators.required],
        descripcionTarea:['',Validators.required],
        fechaLimite: ['',Validators.required],
        estadoTarea:['',Validators.required]
      });

      this._tareaServicio.getList().subscribe({
        next:(data) => {
          this.listaTareas = data
        },error:(e) =>{}
      })
    }

    MostrarAlerta(msg: string, accion: string){
      this._snackBar.open(msg, accion,{
        horizontalPosition:"end", verticalPosition:"top",
        duration: 3000
      });
    }
    
    addEditTarea(){
      console.log(this.formTarea)
      const modelo: Tarea={
        idTarea: 0,
        nombreTarea: this.formTarea.value.nombreTarea,
        descripcion: this.formTarea.value.descripcionTarea,
        fechaLimite: moment(this.formTarea.value.fechaLimite).format("DD/MM/YYYY"),
        estado: this.formTarea.value.estadoTarea,
      }
      if(this.dataTarea == null){
        this._tareaServicio.add(modelo).subscribe({
          next:(data) =>{
            this.MostrarAlerta("Tarea Creada", "listo");
            this.dialogoReferencia.close("Creado");
          },error:(e) =>{
            this.MostrarAlerta("no se pudo crear la tarea","Error");
          }
        })
      }else{
        this._tareaServicio.update(this.dataTarea.idTarea, modelo).subscribe({
          next:(data) => {
            this.MostrarAlerta("Tarea creada","listo");
            this.dialogoReferencia.close("Aztualizado");
          },error:(e) => {
            this.MostrarAlerta("No se pudo crear la Tarea","Error");
          }
        })
      }
    }

    ngOnInit():void{
      if(this.dataTarea){
        this.formTarea.patchValue({
          nombreTarea: this.formTarea.value.nombreTarea,
          descripcion: this.formTarea.value.descripcionTarea,
          fechaLimite: moment(this.formTarea.value.fechaLimite).format("DD/MM/YYYY"),
          estado: this.formTarea.value.estadoTarea
        })
        this.tituloAccion="Editar";
        this.botonAccion="Actualizar";
      }
    }
}
