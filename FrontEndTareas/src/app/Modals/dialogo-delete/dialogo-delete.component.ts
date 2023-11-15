import { Component,OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Tarea } from 'src/app/Interface/tarea';

@Component({
  selector: 'app-dialogo-delete',
  templateUrl: './dialogo-delete.component.html',
  styleUrls: ['./dialogo-delete.component.css']
})
export class DialogoDeleteComponent {

  constructor(
    private dialogoReferencia: MatDialogRef<DialogoDeleteComponent>,
    @Inject (MAT_DIALOG_DATA) public dataTarea: Tarea){

    }
    Eliminar(){
      if(this.dataTarea){
        this.dialogoReferencia.close("eliminar");
      }
    }

}
