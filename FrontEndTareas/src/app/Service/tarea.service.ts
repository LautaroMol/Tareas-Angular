import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import { Tarea } from '../Interface/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private endPoint: string = environment.endPoint;
  private apiUrl:string = this.endPoint + "tarea/"
  constructor(private http:HttpClient) { }
  getList(): Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`${this.apiUrl}lista`);
  }
  add(modelo:Tarea): Observable<Tarea>{
    return this.http.post<Tarea>(`${this.apiUrl}guardar`, modelo);
  }
  update(idTarea:Number, modelo:Tarea): Observable<Tarea>{
    return this.http.put<Tarea>(`${this.apiUrl}actualizar/${idTarea}`, modelo);
  }
  delete(idTarea:Number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}eliminar/${idTarea}`);
  }
}
