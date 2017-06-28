import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    ModalModule.forRoot()
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }


