import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'info-modal',
  templateUrl: './infomodal.component.html'
})

export class InfoModalComponent implements AfterViewInit {
  @ViewChild('infoModal') public infoModal:ModalDirective;
  objConf: any;

  constructor() {
  }

  ngAfterViewInit()	{
    this.infoModal.show();
  }

  yes() {
    const promise = new Promise(function(resolve, reject) {
        resolve(1);
    })
    promise.then(() =>
      this.infoModal.hide()
    ) .then(() => this.yesCallback())
  }

  yesCallback: () => Promise<any>;
}
