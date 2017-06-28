import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { ToastrModule } from 'ngx-toastr';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
//Hearder
import { HeaderLayoutComponent } from './layouts/header-layout.componect';
//Footer
import { FooterLayoutComponent } from './layouts/footer-layout.component';
// Confirm Modal
import { ConfirmModalService } from './common/confirmmodal/confirmmodal.service';
import { ConfirmModalComponent } from './common/confirmmodal/confirmmodal.component';
// Info Modal
import { InfoModalService } from './common/infomodal/infomodal.service';
import { InfoModalComponent } from './common/infomodal/infomodal.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    HttpModule,
    ChartsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    HeaderLayoutComponent,
    FooterLayoutComponent,
    ConfirmModalComponent,
    InfoModalComponent
  ],
  entryComponents: [
    ConfirmModalComponent,
    InfoModalComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    ConfirmModalService,
    InfoModalService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
