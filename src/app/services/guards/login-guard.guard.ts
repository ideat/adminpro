import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router:Router
    ){}

  canActivate() {

    if ( this._usuarioService.estaLogueado() ){
      console.log('Paso por LoginGuard');
      return true;
    }else{
      console.log('Bloqueado por Guard');
      this.router.navigate(['/login']);
      return false;
    }
    
  }
  
}
