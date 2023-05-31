import { Component, OnInit } from '@angular/core';
import { SoportesService } from '../../servicios/soportes.service';
import { Soporte } from '../../modelos/Soporte';
import { FiltrosSoportes } from '../../FiltrosSoportes';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Observable } from 'rxjs';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-soportes',
  templateUrl: './pagina-soportes.component.html',
  styleUrls: ['./pagina-soportes.component.css']
})
export class PaginaSoportesComponent implements OnInit {
  paginador: Paginador<FiltrosSoportes> 
  soportes: Soporte[] = []

  constructor(private servicioSoportes: SoportesService, private router: Router){
    this.paginador = new Paginador<FiltrosSoportes>(this.obtenerSoportes)
  }

  ngOnInit(): void {
    this.paginador.inicializar()
  }

  obtenerSoportes = (pagina: number, limite: number, filtros?: FiltrosSoportes) => {
    return new Observable<Paginacion>((subscriptor)=>{
      this.servicioSoportes.obtenerSoportes(pagina, limite, filtros ?? {}).subscribe({
        next: ( resultado )=>{
          this.soportes = resultado.datos
          subscriptor.next(resultado.paginacion)
        }
      })
    })
  }

  irAResponderSoporte(soporte: Soporte){
    this.servicioSoportes.guardarEnLocalStorage(soporte)
    this.router.navigate(['/administrar', 'responder-soporte', soporte.id])
  }
}
