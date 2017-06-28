import { EmployeeService } from './employee/employee.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule } from '@angular/forms';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

// basicInfo Routing
import {BasicInfoRoutingModule} from './basic-info-routing.module';

@NgModule({
  imports: [
    BasicInfoRoutingModule,
    ModalModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  declarations: [EmployeeComponent]
})
export class BasicInfoModule { }
