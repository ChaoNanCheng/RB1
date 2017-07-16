import {Injectable, ApplicationRef, ElementRef, ComponentRef, ViewContainerRef, ComponentFactory,ComponentFactoryResolver } from '@angular/core';
import {BlockUIComponent} from './blockUI.component';

@Injectable()
export class BlockUIService {
    private blockUI: ComponentRef<BlockUIComponent>;
    public vRef: ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    public start() {
        let factory = this.componentFactoryResolver.resolveComponentFactory(BlockUIComponent);
        this.blockUI = this.vRef.createComponent(factory);
    }

    public stop() {
        if (this.blockUI) {
            this.blockUI.destroy();
        }
    }
}
