import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showMenu: boolean;
  @Input() isEdit: boolean;
  @Input() isDelete: boolean;
  @Input() selectedArr: any;
  @Output() searchValue = new EventEmitter<any>();
  @Output() isCreateTask = new EventEmitter<boolean>();
  @Output() isEditTask = new EventEmitter<boolean>();
  @Output() isDeleteTask = new EventEmitter<boolean>();

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  applyFilter(value) {
    this.searchValue.emit(value);
  }

  addTask() {
    this.isCreateTask.emit(true);
  }

  deleteTasks() {
    this.isDeleteTask.emit(true);
  }

  editTask() {
    this.isEditTask.emit(true);
  }
}
