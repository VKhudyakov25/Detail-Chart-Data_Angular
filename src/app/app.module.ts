import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

import {
  DxDataGridModule,
  DxChartModule,
  DxPopupModule,
} from 'devextreme-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DxDataGridModule, DxChartModule, DxPopupModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
