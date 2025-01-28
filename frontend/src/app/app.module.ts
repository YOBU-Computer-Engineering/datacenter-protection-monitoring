import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceDashboardModule } from 'src/app/device-dashboard/device-dashboard.module'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ //a module must add to import array so modules able to accessible for other modules
    BrowserModule, 
    FormsModule,
    BrowserAnimationsModule ,
    DeviceDashboardModule,
    MatToolbarModule,

    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
