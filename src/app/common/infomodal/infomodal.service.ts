import { Injectable, ApplicationRef, ElementRef, ComponentRef,
  ViewContainerRef,ComponentFactory,ComponentFactoryResolver } from '@angular/core';
import { InfoModalComponent } from './infomodal.component';

@Injectable()
export class InfoModalService {
  private infoModalUI: ComponentRef<InfoModalComponent>;
  public vRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public start(message?: string) {
      if (this.infoModalUI) {
        this.stop();
        this.dostart({message:message});
      } else {
        this.dostart({message:message});
      }
  }

  public startObj(objConf?: any) {
      if (this.infoModalUI) {
        this.stop();
        this.dostart(objConf);
      } else {
        this.dostart(objConf);
      }

  }

  public dostart(objConf?: any) {
        let factory = this.componentFactoryResolver.resolveComponentFactory(InfoModalComponent);
        this.infoModalUI = this.vRef.createComponent(factory);
        const infoModalInstance: InfoModalComponent = this.infoModalUI.instance;
        infoModalInstance.objConf = objConf;
        if (objConf.yesCallback) {
          infoModalInstance.yesCallback = objConf.yesCallback;
        } else {
          infoModalInstance.yesCallback = () => {
            return Promise.resolve(null);
          }
        }
  }

  public stop() {
      if (this.infoModalUI) {
        this.infoModalUI.destroy();
      }
  }
}
