import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './componentes/tabs/tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabComponent } from './componentes/tab/tab.component';



@NgModule({
  declarations: [
    TabsComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    TabsComponent,
    TabComponent
  ]
})
export class NavegacionModule { }
