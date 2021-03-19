import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[]=[];

  totalRegistros: number=0;
  cargando: boolean=true;


  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales()); // se puede recibir y lugo actualizar solo el hospital
  }

  buscarHospital( termino: string){

    if( termino.length <= 0 ){
      this.cargarHospitales();
      return;
    }
    
    this._hospitalService.buscarHospital(termino)
      .subscribe( (hospitales: Hospital[]) => {
        
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  cargarHospitales(){
    this.cargando = true;

    this._hospitalService.cargarHospitales()
      .subscribe(hospitales => this.hospitales = hospitales );
    
    this.cargando = false;

  }

  guardarHospital( hospital: Hospital ){

    this._hospitalService.actualizarHospital(hospital)
      .subscribe();

  }

  borrarHospital(hospital: Hospital){

    this._hospitalService.borrarHospital(hospital._id || '')
      .subscribe(() => this.cargarHospitales());

  }

  crearHospital(){

    Swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true

    }).then( (valor: any) => {

      if(!valor || valor.length ===0){
        return;
      }

      this._hospitalService.crearHospital(valor)
        .subscribe( () => this.cargarHospitales());

    });
  }

  actualizarImagen( hospital: Hospital ){

    this._modalUploadService.mostrarModal( 'hospitales', hospital._id || '');


  }

}
