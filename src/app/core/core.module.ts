import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { MenuMobileComponent } from './components/menu-mobile/menu-mobile.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    MenuComponent,
    MenuMobileComponent,
    ScrollTopComponent,
  ],
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import this module in the AppModule only.'
      );
    }
  }
}
