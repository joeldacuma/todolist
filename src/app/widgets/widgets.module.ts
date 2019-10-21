import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task/task.component';
import { ModalComponent } from './modal/modal.component';

import { MatFormFieldModule,
         MatInputModule,
         MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [
    TaskComponent,
    ModalComponent
  ],
  exports: [
    TaskComponent,
    ModalComponent
  ]
})
export class WidgetsModule { }
