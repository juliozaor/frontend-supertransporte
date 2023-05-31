import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { SoportesService } from '../../servicios/soportes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';
import { Soporte } from '../../modelos/Soporte';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-responder-soporte',
  templateUrl: './pagina-responder-soporte.component.html',
  styleUrls: ['./pagina-responder-soporte.component.css']
})
export class PaginaResponderSoporteComponent implements OnInit{
  @ViewChild('popup') popup!: PopupComponent
  formulario: FormGroup
  soporte?: Soporte
  respondido: boolean = false

  constructor(private servicioSoporte: SoportesService, private activeRoute: ActivatedRoute){
    this.formulario = new FormGroup({
      respuesta: new FormControl<string | undefined>( {
        value: undefined,
        disabled: this.respondido
      } , [ Validators.required ] ),
      adjunto: new FormControl<File | undefined>( undefined )
    })
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: (parametros) =>{
        const idSoporte = Number(parametros['idSoporte'])
        let soporte = this.servicioSoporte.obtenerDeLocalSotrage()
        if(soporte && soporte.id === idSoporte){
          this.soporte = soporte
        }else{
          //sacar soporte del backend
        }
        this.respondido = this.soporte!.idEstado !== 1 ? true : false
        this.formulario.controls['respuesta'].updateValueAndValidity()
      }
    })
  }

  responderSoporte(){
    if(this.formulario.invalid){
      marcarFormularioComoSucio(this.formulario)
      return
    }
    if(!this.soporte){
      this.popup.abrirPopupFallido('Algo salió mal', 'No se encontró el soporte al que responder')
      throw Error('No se encontró soporte al que responder')
    }
    const controls = this.formulario.controls
    this.servicioSoporte.responderSoporte(this.soporte.id, controls['respuesta'].value, controls['adjunto'].value).subscribe({
      next: ( soporte )=>{
        this.popup.abrirPopupExitoso('Respuesta enviada con éxito')
        this.soporte = soporte;
      }
    })
  }
}
