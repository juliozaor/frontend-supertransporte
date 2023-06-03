import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { ErrorAutorizacion } from 'src/app/errores/ErrorAutorizacion';
import { CategorizacionService } from '../../servicios/categorizacion.service';
import { Categorizacion, Dato } from '../../modelos/Categorizacion';
import { TipoCategoriaComponent } from '../../componentes/tipo-categoria/tipo-categoria.component';
import { FormularioModalidadRadioOperacionComponent } from '../../componentes/formulario-modalidad-radio-operacion/formulario-modalidad-radio-operacion.component';
import { PeticionGuardarCategorizacion } from '../../modelos/PeticionGuardarCategorizacion';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { ModalConfirmacionComponent } from '../../componentes/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-pagina-categorizacion',
  templateUrl: './pagina-categorizacion.component.html',
  styleUrls: ['./pagina-categorizacion.component.css']
})
export class PaginaCategorizacion implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  @ViewChild('modalConfirmacion') modalConfirmacion!: ModalConfirmacionComponent
  @ViewChildren('tipoCategoria') tiposCategoria!: QueryList<TipoCategoriaComponent>
  @ViewChild('formularioModalidades') formularioModalidadesRadios!: FormularioModalidadRadioOperacionComponent
  usuario: Usuario
  filtros?: Categorizacion

  constructor(private localStorage: ServicioLocalStorage, private servicioCategorizacion: CategorizacionService){
    const usuario = this.localStorage.obtenerUsuario()
    if(!usuario){
      throw new ErrorAutorizacion()
    }
    this.usuario = usuario
  }

  ngOnInit(): void {
    this.servicioCategorizacion.obtenerFiltros(this.usuario.id).subscribe({
      next: (filtros)=>{
        this.filtros = filtros
      }
    })
  }

  totalesValidos(): boolean{
    let totalesValidos = true
    this.tiposCategoria.forEach( tipoCategoria => {
      if(!tipoCategoria.validarTotales()){
        totalesValidos = false
      }
    })
    return totalesValidos
  }

  obtenerDatos(): Dato[]{
    let datos: Dato[] = []
    this.tiposCategoria.forEach( categoria => {
      datos = [...datos, ...categoria.obtenerDatos()]
    })
    return datos
  }

  obtenerTotalesPorTipoCategoria(){
    const idTipoConductores = 1;
    const idTipoVehiculos = 2;
    let totalConductores = 0;
    let totalVehiculos = 0;
    this.tiposCategoria.forEach( tipoCategoria => {
      if(tipoCategoria.tipoCategoria.idTipo === idTipoConductores){
        totalConductores = tipoCategoria.total
      }
      if(tipoCategoria.tipoCategoria.idTipo === idTipoVehiculos){
        totalVehiculos = tipoCategoria.total
      }
    })
    return {conductores: totalConductores, vehiculos: totalVehiculos}
  }

  guardarInformacion(){
    if(!this.totalesValidos()){
      this.popup.abrirPopupFallido('Los totales no coinciden.', 'Porfavor rectifica que has digitado correctamente la información.')
      return;
    }
    this.modalConfirmacion.abrir({
      alAceptar: ()=>{
        const info: PeticionGuardarCategorizacion = {
          datos: this.obtenerDatos(),
          modalidadesRadio: this.formularioModalidadesRadios.registrosACrear,
          modalidadesRadioEliminar: this.formularioModalidadesRadios.registrosAEliminar,
          totales: this.obtenerTotalesPorTipoCategoria()
        }
        console.log(info)
        this.servicioCategorizacion.guardarInformacionCategorizacion(info).subscribe({
          next: ()=>{
            this.popup.abrirPopupExitoso('Información guardado con éxito')
          }
        })
      },
      alCancelar: ()=>{}
    })
  }
}
