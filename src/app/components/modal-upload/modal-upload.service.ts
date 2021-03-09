import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string='';
  public id: string = '';

  public oculto:string='oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { 
    
  }

  ocultaModal(){
    this.oculto= 'oculto';
    this.id = '';
    this.tipo = '';
  }

  mostrarModal(tipo: string, id: string){
    
    this.oculto='';
    this.id = id;
    this.tipo = tipo;
  }

}
