import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private firebaseService: FirebaseService) { }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.data.rows.map(row => {
      this.firebaseService.removeTasks(row.uid);
    });

    this.dialogRef.close();
  }

}
