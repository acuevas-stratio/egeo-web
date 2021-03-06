import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { StHeaderModel, StHeaderUserMenuModel, EgeoResolveService } from '@stratio/egeo';

import { HEADER_MENU, USER_MENU } from './header-demo.model';

@Component({
   selector: 'header-demo',
   template: `
      <div class="header-container">
         <st-header
            appName="Gosec"
            [menu]="(menu | async) || []"
            [userMenu]="userMenu"
            (contentChangeOffset)="onContentChangeOffset($event)"
            qaTag="st-header" [maxWidth]="1700"
            stHeaderBehavior
         ></st-header>

         <div [ngStyle]="{'padding-top': contentOffset + 'px'}">
            <router-outlet></router-outlet>
         </div>
      </div>
   `,
   styles: [`
      .header-container {
         width: 100%;
         position: relative;
      }
   `]
})
export class HeaderDemoComponent {

   public contentOffset: number = 0;
   public menu: Observable<StHeaderModel>;
   public headerMenuSchema: Object[] = HEADER_MENU;
   public userMenu: StHeaderUserMenuModel = USER_MENU;

   constructor(
      private _cd: ChangeDetectorRef,
      private resolveService: EgeoResolveService,
      private translate: TranslateService
   ) {
      this.menu = this.resolveService.translate(this.headerMenuSchema, this.translate);
   }

   onContentChangeOffset(offset: number): void {
      this.contentOffset = offset + 10;
      setTimeout(() => {
         this._cd.markForCheck();
      });
   }
}
