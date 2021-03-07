import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Router } from '@angular/router';

import {  map } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario!: Usuario;
  token : string= '';

  constructor(
    public http: HttpClient,
    public router: Router
    
  ) {
    this.cargarStorage();
  }

  estaLogueado(){
    return ( this.token.length > 5) ? true : false;
  }

  cargarStorage(){

    if( localStorage.getItem('token')){

      this.token = localStorage.getItem('token') || '';
      this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    }else{
      this.token = '';
      this.usuario = null as any;
    }

  }

  guardarStorage( id:string, token:string, usuario: Usuario){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null as any;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  loginGoogle(token: string){

    let url = URL_SERVICIOS  + '/login/google';

    return this.http.post ( url, { token })
        .pipe(map( (resp:any) => {

          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
        }));

  }

  login( usuario:Usuario, recordar:boolean=false ){

    let url = URL_SERVICIOS + '/login';
    // console.log(url);
    // console.log(usuario);
    
    return this.http.post(url,usuario)
      .pipe(map( (resp:any) => {
          
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
      }));

  }

  crearUsuario(usuario: Usuario){

    let url = URL_SERVICIOS+'/usuario';

    return this.http.post( url, usuario )
               .pipe(map( (resp:any) => {

                Swal.fire('Usuario creado', usuario.email, 'success');
                return resp.usuario;

               } ));
    
  }

}
