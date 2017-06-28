import { Injectable, ApplicationRef, ElementRef, ComponentRef,
  ViewContainerRef,ComponentFactory,ComponentFactoryResolver } from '@angular/core';
import { ConfirmModalComponent } from './confirmmodal.component';

@Injectable()
export class ConfirmModalService {
  private confirmModalUI: ComponentRef<ConfirmModalComponent>;
  public vRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public start(message?: string) {
      if (this.confirmModalUI) {
        this.stop();
        this.dostart({message:message});
      } else {
        this.dostart({message:message});
      }
  }

  public startObj(objConf?: any) {
      if (this.confirmModalUI) {
        this.stop();
        this.dostart(objConf);
      } else {
        this.dostart(objConf);
      }

  }

  public dostart(objConf?: any) {
        let factory = this.componentFactoryResolver.resolveComponentFactory(ConfirmModalComponent);
        this.confirmModalUI = this.vRef.createComponent(factory);
        const confirmModalInstance: ConfirmModalComponent = this.confirmModalUI.instance;
        confirmModalInstance.objConf = objConf;
        if (objConf.yesCallback) {
          confirmModalInstance.yesCallback = objConf.yesCallback;
        } else {
          confirmModalInstance.yesCallback = () => {
            return Promise.resolve(null);
          }
        }
  }

  public stop() {
      if (this.confirmModalUI) {
        this.confirmModalUI.destroy();
      }
  }
}
