import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDashboardComponent } from './device-dashboard/device-dashboard.component';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  exports:[ //To see this HTML in the AppComponent
    DeviceDashboardComponent
  ],
  declarations: [
    DeviceDashboardComponent
  ],
  imports: [
    NgxChartsModule,
    FormsModule,
    NgxChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatNativeDateModule,    
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class DeviceDashboardModule { }
