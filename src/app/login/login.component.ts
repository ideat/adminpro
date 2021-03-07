import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { generateKeyPair } from 'crypto';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

declare function init_plugins():any;
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame:boolean=false;

  auth2:any;

  constructor( 
    public router:Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
  }

  googleInit(){

    gapi.load('auth2', () =>{

      this.auth2 = gapi.auth2.init({
        client_id: '9296441154-8e3uc8pmup75ld1orq73kkkdia8i5p3l.apps.googleusercontent.com',
        cookiepolic: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

  attachSignin( element: any ){

    this.auth2.attachClickHandler( element, {}, (googleUser: { getAuthResponse: () => any; }) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
        .subscribe( () => {
          // this.router.navigate(['/dashboard']);
          window.location.href = '#/dashboard'; //redireccion en forma manual
        });
  
      
    })

  }

  ingresar( forma: NgForm){

    if ( forma.invalid){
      return;
    }

    let usuario = new Usuario('', forma.value.email, forma.value.password);

    this._usuarioService.login( usuario, forma.value.recuerdame)
      .subscribe( resp => this.router.navigate(['/dashboard']));
 
    // this.router.navigate(['/dashboard']);
  }

}
