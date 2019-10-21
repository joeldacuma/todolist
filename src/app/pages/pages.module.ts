import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalModule } from '../global/global.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { HomeComponent } from './home/home.component';

import { MatTableModule,
         MatPaginatorModule,
         MatSortModule,
         MatCheckboxModule,
         MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatDialogModule } from '@angular/material';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    HomeComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    WidgetsModule
  ],
  exports: [
    HomeComponent,
    TaskComponent
  ]
})
export class PagesModule { }
