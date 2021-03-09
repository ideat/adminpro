import { Component, OnInit } from '@angular/core';
import { throwIfEmpty } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir!: File;
  imagenTemp!: string;

  constructor(
    public _usuarioService: UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
    
  }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario){

    this.usuario.nombre = usuario.nombre;

    if( !this.usuario.google){
      this.usuario.email = usuario.email;
    }

    this.usuario.email = usuario.email;

    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe( resp => {

        console.log( resp);
      })
  }

  seleccionImagen( event: any ){

    let archivo:File = event.target.files[0];
    if (!archivo){
      this.imagenSubir != null;
      return;
    }

    if ( archivo.type.indexOf('image')< 0){
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir != null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      this.imagenTemp = reader.result as string ;
     
    }
  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubir , this.usuario._id? this.usuario._id:'');
    
  }

}
