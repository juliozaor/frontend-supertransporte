import { Component, Input } from '@angular/core';
import { ModalidadRadio } from '../../modelos/Categorizacion';

@Component({
  selector: 'app-formulario-modalidad-radio-operacion',
  templateUrl: './formulario-modalidad-radio-operacion.component.html',
  styleUrls: ['./formulario-modalidad-radio-operacion.component.css']
})
export class FormularioModalidadRadioOperacionComponent {
  @Input('modalidadRadio') modalidadRadio!: ModalidadRadio
}
