import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string='';
  hospital !: Hospital;
  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  estaLogueado(){
    return ( this.token.length > 5) ? true : false;
  }

  cargarStorage(){

    if( localStorage.getItem('token')){

      this.token = localStorage.getItem('token') || '';
      
    }else{
      this.token = '';
  
    }

  }


  cargarHospitales(){

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get( url)
      .pipe(map( (resp:any) => {
        this.totalHospitales = resp.total;
         return resp.hospitales;
      }));

  }

  obtenerHospital( id: string){

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
      .pipe(map( (resp:any) => resp.hospital));
  }

  borrarHospital(id: string){

    let url = URL_SERVICIOS + '/hospital/'  + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
      .pipe(map( resp => {
        Swal.fire ('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
        return true;
      }));

  }

  crearHospital( nombre: string){

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    console.log('nombre:', {nombre});
    
    return this.http.post( url,  {nombre}  )
      .pipe(map( (resp:any) => {

        // Swal.fire('Hospital creado', nombre, 'success');
        return resp.hospital;

      }));

  }

  buscarHospital( termino: string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    
    return this.http.get( url )
      .pipe(map( (resp:any) => resp.hospitales));

  }

  actualizarHospital( hospital: Hospital){
    
    let url = URL_SERVICIOS +'/hospital/'+ hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital)
      .pipe(map((resp:any) => { 
        
        Swal.fire('Hospital Actualizados', hospital.nombre,'success');
        return resp.hospital 
      
      }));


  }
}
