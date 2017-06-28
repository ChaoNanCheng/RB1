import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component'

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Basic Info'
        },
        children: [
            {
                path: 'employee',
                component: EmployeeComponent,
                data: {
                    title: 'Employee'
                }
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BasicInfoRoutingModule { }