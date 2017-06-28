import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirmmodal.component.html'
})

export class ConfirmModalComponent implements AfterViewInit {
  @ViewChild('confirmModal') public confirmModal:ModalDirective;
  objConf: any;

  constructor() {
  }

  ngAfterViewInit()	{
    this.confirmModal.show();
  }

  yes() {
    const promise = new Promise(function(resolve, reject) {
        resolve(1);
    })
    promise.then(() =>
      this.confirmModal.hide()
    ) .then(() => this.yesCallback())
  }

  yesCallback: () => Promise<any>;
}
