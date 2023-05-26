import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SoportesService } from 'src/app/soportes/servicios/soportes.service';
import { marcarFormularioComoSucio } from '../../utilidades/Utilidades';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';

@Component({
  selector: 'app-pagina-soporte',
  templateUrl: './pagina-soporte.component.html',
  styleUrls: ['./pagina-soporte.component.css']
})
export class PaginaSoporteComponent {
  @ViewChild('popup') popup!: PopupComponent
  formulario: FormGroup
  constructor(private servicioSoporte: SoportesService){
    this.formulario = new FormGroup({
      descripcion: new FormControl<string | undefined>( undefined, [ Validators.required ] ),
      adjunto: new FormControl<File | undefined>( undefined )
    })
  }

  crearSoporte(){
    if(this.formulario.invalid){
      marcarFormularioComoSucio(this.formulario)
      return
    }
    const controls = this.formulario.controls
    this.servicioSoporte.crearSoporte(controls['descripcion'].value, controls['adjunto'].value).subscribe({
      next: ( soporte: any )=>{
        this.popup.abrirPopupExitoso('Soporte creado', 'Radicado', soporte.radicado)
      }
    })
  }
}
