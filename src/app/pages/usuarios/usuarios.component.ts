import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]=[];
  desde: number=0;

  totalRegistros: number=0;
  cargando: boolean=true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
      .subscribe( resp => this.cargarUsuarios());
  }

  mostrarModal( id: string ){
    this._modalUploadService.mostrarModal('usuarios',id);
  }

  cargarUsuarios(){

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe( (resp:any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
      })
    
    this.cargando = false;
  }

  cambiarDesde(valor:number){

    let desde = this.desde + valor;
    console.log( desde );

    if ( desde >= this.totalRegistros){
      return;
    }

    if (desde < 0){
      return;
    }

    this.desde+= valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string){

    if( termino.length <= 0 ){
      this.cargarUsuarios();
      return;
    }
    
    this._usuarioService.buscarUsuarios(termino)
      .subscribe( (usuarios: Usuario[]) => {
        
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario){

    if( usuario._id === this._usuarioService.usuario._id){
      Swal.fire('No puede borrar usuario','No se puede borrar a si mismo','error');
      return;
    }
    
    Swal.fire({
      title: 'Esta seguro?',
      text: "Esta apunto de borrar a " + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
     
    }).then((borrar) => {
      
      if (borrar){
        this._usuarioService.borrarUsuario(usuario._id || '')
          .subscribe( borrado => {
            console.log( borrado );
            this.cargarUsuarios();

          })
      }
    })
  }

  guardarUsuario( usuario: Usuario){

    this._usuarioService.actualizarUsuario( usuario )
      .subscribe();
  }

}
