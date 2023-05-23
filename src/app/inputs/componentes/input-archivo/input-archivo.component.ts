import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-archivo',
  templateUrl: './input-archivo.component.html',
  styleUrls: ['./input-archivo.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputArchivoComponent),
      multi: true
    }
  ]
})
export class InputArchivoComponent implements OnInit, ControlValueAccessor {
  @Output('change') haCambiado: EventEmitter<void>
  @Input('nombre') nombre!: string
  @Input('acepta') acepta: string[] = []
  archivo?: File | null;
  disabled: boolean = false
  constructor() { 
    this.haCambiado = new EventEmitter<void>();
  }

  onChangeFiles = (evento: Event) => {
    if (!evento.target) {
      throw Error('El target del evento no es un input')
    }
    const input = evento.target as HTMLInputElement
    if (input.files) {
      this.archivo = input.files.item(0)
      this.onChange(this.archivo)
      this.haCambiado.emit()
    }
  }

  onChange = (archivo: File | null) => {}

  onTouched = () => { }

  writeValue(archivo: File): void {
    this.archivo = archivo
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  ngOnInit(): void {
  }

  unirAcepta(){
    return this.acepta.join(',')
  }

}
