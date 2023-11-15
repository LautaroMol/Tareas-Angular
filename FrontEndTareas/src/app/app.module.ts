import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { TareaComponentComponent } from './tarea-component/tarea-component.component';
import { DialogaddeditComponent } from './Modals/dialogaddedit/dialogaddedit.component'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
//Controles de formularios
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DialogoDeleteComponent } from './Modals/dialogo-delete/dialogo-delete.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
//diseños
import {MatIconModule} from '@angular/material/icon'; 
import { FiltroPorNombrePipe } from './filtro-por-nombre.pipe';
import { TareaService } from './Service/tarea.service';
import {MatExpansionModule} from '@angular/material/expansion'; 
@NgModule({
  declarations: [
    AppComponent,
    TareaComponentComponent,
    DialogaddeditComponent,
    DialogoDeleteComponent,
    FiltroPorNombrePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatExpansionModule
  ],
  providers: [DatePipe,
    TareaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
