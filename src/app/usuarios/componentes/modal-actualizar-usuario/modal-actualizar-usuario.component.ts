import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../modelos/Usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioUsuarios } from '../../servicios/usuarios.service';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { Rol } from '../../modelos/Rol';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-modal-actualizar-usuario',
  templateUrl: './modal-actualizar-usuario.component.html',
  styleUrls: ['./modal-actualizar-usuario.component.css']
})
export class ModalActualizarUsuarioComponent implements OnInit{
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent
  usuario?: Usuario
  formulario: FormGroup
  roles: Rol[] = []

  constructor(private servicioModal: NgbModal, private servicio: ServicioUsuarios){
    this.formulario = new FormGroup({
      nombre: new FormControl(undefined, [ Validators.required ]),
      apellido: new FormControl(undefined),
      identificacion: new FormControl(undefined, [ Validators.required ]),
      fechaNacimiento: new FormControl(undefined, [ Validators.required ]),
      correo: new FormControl(undefined, [ Validators.required ]),
      telefono: new FormControl(undefined),
      rol: new FormControl("", [ Validators.required ]),
    })
  }

  ngOnInit(): void {
    this.obtenerRoles()
  }

  abrir(usuario: Usuario){
    this.usuario = usuario
    this.rellenarFormulario(usuario)
    this.servicioModal.open(this.modal, {
      size: 'xl'
    })
  }

  actualizar(){
    console.log(this.formulario.controls)
    if(this.formulario.invalid){
      marcarFormularioComoSucio(this.formulario)
      return;
    }
    const controls = this.formulario.controls
    this.servicio.guardar({
      apellido: controls['apellido'].value,
      nombre: controls['nombre'].value,
      correo: controls['correo'].value,
      fechaNacimiento: controls['fechaNacimiento'].value,
      identificacion: controls['identificacion'].value,
      idRol: controls['rol'].value,
      telefono: controls['telefono'].value
    }).subscribe({
      next: ()=>{
        this.popup.abrirPopupExitoso("Usuario creado con éxito.")
        this.limpiarFormulario()
      },
      error: ()=>{
        this.popup.abrirPopupFallido("Error al crear el usuario", "Intentalo más tarde.")
      }
    })
  }

  rellenarFormulario(usuario: Usuario){
    const controls = this.formulario.controls
    controls['apellido'].setValue(usuario.apellido)
    controls['nombre'].setValue(usuario.nombre)
    controls['correo'].setValue(usuario.correo)
    controls['fechaNacimiento'].setValue(
      DateTime.fromISO(usuario.fechaNacimiento).toFormat('yyyy-MM-dd') 
    )
    controls['identificacion'].setValue(usuario.identificacion)
    controls['rol'].setValue(usuario.idRol)
    controls['telefono'].setValue(usuario.telefono)
  }

  limpiarFormulario(){
    this.formulario.reset()
    this.formulario.get('rol')!.setValue("")
  }

  obtenerRoles(){
    this.servicio.listarRoles().subscribe({
      next: (respuesta) => {
        this.roles = respuesta.rols
      }
    })
  }

}
