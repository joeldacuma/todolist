import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TaskModel } from '../../models/task-form.model';
import * as uuidv4 from 'uuid/v4';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public taskForm: FormGroup;
  public totalListCount: number;
  public isEdit: boolean;

  constructor(public dialogRef: MatDialogRef<TaskComponent>,
              public formBuilder: FormBuilder,
              public firebaseService: FirebaseService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.taskForm = this.formBuilder.group(TaskModel);
              }

  ngOnInit() {
    if (this.data.isEdit) {
      this.isEdit = true;
      console.log(this.data.value);
      this.taskForm.patchValue({
        name: this.data.value.name,
        description: this.data.value.description,
        created: this.data.value.created
      });
    }

    this.firebaseService.getLists().subscribe(lists => {
       this.totalListCount = lists.length;
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.taskForm.valid) {
      const body = this.taskForm.value;
      const uuid = uuidv4();
      Object.assign(body, { id: this.totalListCount + 1, uid: uuid });
      this.firebaseService.createTask(uuid, body);
    }
  }

  update() {
    if (this.taskForm.valid) {
      const body = this.taskForm.value;
      const uid = this.data.value.uid;
      this.firebaseService.updateTask(uid, body);

      this.close();
    }
  }
}
