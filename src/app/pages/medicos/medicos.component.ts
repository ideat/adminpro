import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[]=[];
  constructor(
    public _medicosService: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicosService.cargarMedicos()
      .subscribe( medicos => this.medicos = medicos);
  }


  buscarMedico( termino: string ){

    if ( termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicosService.buscarMedicos(termino)
      .subscribe( medicos => this.medicos = medicos);
  }

  borrarMedico( medico: Medico){

    this._medicosService.borrarMedico(medico._id || '')
      .subscribe(() => this.cargarMedicos());


  }

}
