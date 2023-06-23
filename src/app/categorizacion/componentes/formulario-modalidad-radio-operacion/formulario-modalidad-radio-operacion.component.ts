import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalidadRadio } from '../../modelos/Categorizacion';
import { Modalidad } from '../../modelos/Modalidad';
import { Radio } from '../../modelos/Radio';
import { CategorizacionService } from '../../servicios/categorizacion.service';
import { ModalidadRadioACrear } from '../../modelos/ModalidadRadioACrear';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';

@Component({
  selector: 'app-formulario-modalidad-radio-operacion',
  templateUrl: './formulario-modalidad-radio-operacion.component.html',
  styleUrls: ['./formulario-modalidad-radio-operacion.component.css']
})
export class FormularioModalidadRadioOperacionComponent implements OnInit {
  @Output('aCrear') aCrear                : EventEmitter<ModalidadRadioACrear[]>
  @Output('aEliminar') aEliminar          : EventEmitter<number[]>
  @Input('modalidadRadio') modalidadRadio!: ModalidadRadio

  formulario        : FormGroup
  modalidades       : Modalidad[] = []
  radios            : Radio[] = []
  registrosACrear   : ModalidadRadioACrear[] = []
  registrosAEliminar: number[] = []
  formularioVisible : boolean = false
  valido            : boolean = true

  constructor(private servicioCategorizacion: CategorizacionService){
    this.aCrear = new EventEmitter<ModalidadRadioACrear[]>();
    this.aEliminar = new EventEmitter<number[]>();

    this.formulario = new FormGroup({
      idModalidad: new FormControl<number | string>("", [Validators.required]), 
      idRadio: new FormControl<number | string>("", [Validators.required]) 
    })
  }

  ngOnInit(): void {
    this.obtenerModalidades()
    this.obtenerRadios()
    this.valido = this.esValido()
  }

  mostrarFormulario(){
    this.formularioVisible = true
  }

  ocultarFormulario(){
    this.formularioVisible = false
  }

  agregarARam(){
    if(this.formulario.invalid){
      marcarFormularioComoSucio(this.formulario)
      return;
    }
    const idRadio = this.formulario.get('idRadio')!
    const idModalidad = this.formulario.get('idModalidad')!
    const modalidadRadio: ModalidadRadioACrear = {
      idModalidad: Number(idModalidad.value),
      idRadio: Number(idRadio.value)
    }
    this.registrosACrear.push(modalidadRadio)
    this.ocultarFormulario()
    this.mostrarMensajeDeGuardado()
    this.valido = this.esValido()
    this.limpiarFormulario()
  }

  limpiarFormulario(){
    this.formulario.reset()
    this.formulario.get('idRadio')!.setValue('')
    this.formulario.get('idModalidad')!.setValue('')
  }

  retirarDeRam(indice: number){
    this.registrosACrear.splice(indice, 1)
    this.mostrarMensajeDeGuardado()
    this.valido = this.esValido()
  }

  eliminarRegistro(id: number){
    this.registrosAEliminar.push(id)
    this.mostrarMensajeDeGuardado()
    this.valido = this.esValido()
  }

  cancelarEliminacionRegistro(id: number){
    const indice = this.registrosAEliminar.findIndex( idEnArreglo => idEnArreglo === id)
    this.registrosAEliminar.splice(indice, 1)
    this.valido = this.esValido()
  }

  obtenerModalidades(){
    this.servicioCategorizacion.obtenerModalidades().subscribe({
      next: (respuesta) => {
        this.modalidades = respuesta.modalidades
      }
    })
  }

  obtenerRadios(){
    this.servicioCategorizacion.obtenerRadios().subscribe({
      next: (respuesta) => {
        this.radios = respuesta.radios
      }
    })
  }

  esRegistroAEliminar(id: number): boolean{
    return this.registrosAEliminar.includes(id)
  }

  nombreModalidad(idModalidad: number): string{
    const indice = this.modalidades.findIndex( modalidad => modalidad.id === idModalidad)
    if(indice !== -1){
      return this.modalidades[indice].nombre
    }
    return '-'
  }

  nombreRadio(idRadio: number): string{
    const indice = this.radios.findIndex( radio => radio.id === idRadio)
    if(indice !== -1){
      return this.radios[indice].nombre
    }
    return '-'
  }

  mostrarMensajeDeGuardado(){
    return this.registrosACrear.length > 0 || this.registrosAEliminar.length > 0 ? true : false;
  }

  estaAgregandoModuloRadio(): boolean{
    return this.formularioVisible
  }

  esValido(){
    if(this.registrosACrear.length > 0){
      return true 
    }
    if(this.registrosAEliminar.length < this.modalidadRadio.filas.length){
      return true
    }
    return false
  }
}
