import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FirebaseService } from '../../services/firebase.service';
import { List } from '../../models/lists.model';

import { TaskComponent } from '../../widgets/task/task.component';
import { ModalComponent } from '../../widgets/modal/modal.component';

import { MatTableDataSource,
         MatPaginator,
         MatSort,
         MatDialog } from '@angular/material';
import { TaskModel } from 'src/app/models/task-form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public itemLists: List[];
  public displayedColumns = ['select', 'id', 'name', 'description', 'created'];
  public dataSource = new MatTableDataSource(this.itemLists);
  public selection = new SelectionModel<List>(true, []);
  public isDeleted: boolean;
  public isEdited: boolean;
  public selectRows = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private firebaseService: FirebaseService,
              private dialog: MatDialog,
              private router: Router) {
                this.isDeleted = true;
                this.isEdited = true;
              }

  ngOnInit() {
    this.firebaseService.getLists().subscribe(val => {
      this.itemLists = [];
      val.forEach((element: any) => {
        this.itemLists.push(element);
      });

      this.dataSource = new MatTableDataSource(this.itemLists);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.isDeleted = true;
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
      this.isDeleted = false;
    }

    this.selectRows = this.selection.selected;
  }

  checkLabel(row?: List): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect' } all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select' } row ${row.id + 1}`;
  }

  applySearch(event) {
    this.dataSource.filter = event.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCreateTask(event) {
    if (event) {
      const dialogRef = this.dialog.open(TaskComponent, {
        width: '400px',
        data: {}
      });
    }
  }

  openEditTask(event) {
    if (event) {
      const dialogRef = this.dialog.open(TaskComponent, {
        width: '400px',
        data: { isEdit: true, value: this.selectRows[0] }
      });
    }
  }

  confirmDelete(event) {
    if (event) {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '400px',
        data: {rows: this.selectRows}
      });
    }
  }

  selectToggle(event, row) {

    if (event.checked) {
      // this.isEnabled = false;
      this.isDeleted = false;
      this.selection.toggle(row);
      this.selectRows = this.selection.selected;

      if (this.selectRows.length === 1) {
        this.isEdited = false;
      } else if (this.selectRows.length > 1) {
        this.isEdited = true;
      }

    } else {
      this.selectRows = this.selection.selected.filter(x => x.id !== row.id);
    }

    if (this.selectRows.length <= 0) {
      // this.isEnabled = true;
      this.isDeleted = true;
      this.isEdited = true;
      this.selection.clear();
    }
  }

  gotoTaskDetails(task) {
    this.router.navigateByUrl('/task', {state: task});
  }
}
