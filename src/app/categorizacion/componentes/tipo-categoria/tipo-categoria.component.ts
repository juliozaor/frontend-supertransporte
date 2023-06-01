import { Component, Input } from '@angular/core';
import { TipoCategoria } from '../../modelos/Categorizacion';

@Component({
  selector: 'app-tipo-categoria',
  templateUrl: './tipo-categoria.component.html',
  styleUrls: ['./tipo-categoria.component.css']
})
export class TipoCategoriaComponent {
  @Input('tipoCategoria') tipoCategoria!:TipoCategoria 
}
