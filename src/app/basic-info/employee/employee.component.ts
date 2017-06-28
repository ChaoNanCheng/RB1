import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { EmployeeService } from './employee.service';
import { employeeAllData } from './employeeAllData'
import { Observable }        from 'rxjs/Observable';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ConfirmModalService } from './../../common/confirmmodal/confirmmodal.service';
import { InfoModalService } from './../../common/infomodal/infomodal.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  data:Observable<any>;
 // data:Observable<any>;
  employeeList:Observable<any>;
  apiResult:Observable<any>;

  constructor(
    public employeeService: EmployeeService,
    private viewContainerRef: ViewContainerRef,
    private confirmModalUI: ConfirmModalService,
    private infoModalUI: InfoModalService
  ) {
    this.confirmModalUI.vRef = this.viewContainerRef;
    this.infoModalUI.vRef = this.viewContainerRef;
  }



  ngOnInit() {

   // this.data = this.employeeService.findAll();
    /*this.data.subscribe (
      data => {
        //console.info(data.employeeList);
        //console.info(data.apiResult);
        //this.employeeList = data.employeeList;
      },
      err => console.error(err),
      () => console.log('done')
    );*/

    /*this.data.subscribe(
      data => {
        //this.employeeList = data.json().employeeList;
        //this.apiResult = data.json().apiResult;
      },
      err => console.error(err),
      () => console.log('done')
    );*/
  }

  showDeleteDialog () {
    let config:any;

    config = {
      message:'確定要刪除嗎？',
      title: '刪除提示',
      yesBtnName: '',
      yesCallback: () => {
                this.doDelete();
                return Promise.resolve(null);
            }
    }

    this.confirmModalUI.startObj(config);
  }

  doDelete () {
    console.log("刪除");
    console.log(this.employeeService.cbChecked);

    if (this.employeeService.cbChecked.length == 0) {
      this.infoModalUI.start("請選擇一筆以上的員工明細！");
    } else {
      this.employeeService.doDelete();
    }
    //console.log(this.selectedOptions());
    //let sltOpts = this.selectedOptions();
    //this.datas.forEach(item => item.forEach(op=> console.log(op)));
  }


}
