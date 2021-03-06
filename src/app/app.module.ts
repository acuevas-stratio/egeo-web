import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

/* App Root */
import { AppComponent } from './app.component';
import { APP_LANGUAGE_PROVIDERS_OBJECT } from './app.config';

/* Other modules Imports */
import { LayoutComponent } from './layout/layout.component';
import { LayoutMenuItemComponent } from './layout/menu-item/menu-item.component';
import { LayoutMenuComponent } from './layout/menu/menu.component';
import { HeaderComponent } from './layout/header/header.component';
import { Error404Component } from './errors/error.404.component';
import { routing } from './app.routing';
import { SharedModule } from 'shared';
import { VersionService } from './layout/layout.service';
import { ModalTestComponent } from './+components/modal/modal-test.component';
import { HeaderDemoModule } from './header-demo/header-demo.module';
import { GridDemoModule } from './grid-demo/grid-demo.module';

/* External libs */
import { TranslateModule } from '@ngx-translate/core';
import { EgeoModule, StModalModule } from '@stratio/egeo';

// Hot Loader
import { AppStore, State } from './app.store';
import {
   removeNgStyles,
   createNewHosts,
   createInputTransfer
} from '@angularclass/hmr';

// Libs and external dependencies
import 'rxjs';
import '../styles/global.scss';

@NgModule({
   imports: [
      BrowserModule,
      HttpModule,
      EgeoModule.forRoot(),
      routing,
      TranslateModule.forRoot(APP_LANGUAGE_PROVIDERS_OBJECT),
      StModalModule.withComponents([ModalTestComponent]),
      HeaderDemoModule,
      GridDemoModule,
      SharedModule
   ],
   declarations: [
      AppComponent,
      LayoutComponent,
      LayoutMenuComponent,
      LayoutMenuItemComponent,
      Error404Component,
      ModalTestComponent,
      HeaderComponent
   ],
   providers: [AppStore, VersionService],
   bootstrap: [AppComponent]
})
export class AppModule {
   constructor(public appRef: ApplicationRef, public appStore: AppStore) {}
   hmrOnInit(store: any): void {
      if (!store || !store.state) {
         return;
      }
      console.log('HMR store', JSON.stringify(store, undefined, 2));
      // restore state
      this.appStore.setState(store.state);
      // restore input values
      if ('restoreInputValues' in store) {
         store.restoreInputValues();
      }
      this.appRef.tick();
      Object.keys(store).forEach(prop => delete store[prop]);
   }
   hmrOnDestroy(store: any): void {
      const cmpLocation = this.appRef.components.map(
         cmp => cmp.location.nativeElement
      );
      const currentState = this.appStore.getState();
      store.state = currentState;
      // recreate elements
      store.disposeOldHosts = createNewHosts(cmpLocation);
      // save input values
      store.restoreInputValues = createInputTransfer();
      // remove styles
      removeNgStyles();
   }
   hmrAfterDestroy(store: any): void {
      // display new elements
      store.disposeOldHosts();
      delete store.disposeOldHosts;
   }
}
