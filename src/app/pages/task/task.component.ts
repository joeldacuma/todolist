import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public taskDetails: any;
  constructor(public route: ActivatedRoute,
              public location: Location,
              public router: Router) { }

  ngOnInit() {
    this.taskDetails = this.location.getState();
  }

  gotoHome() {
    this.router.navigateByUrl('/home');
  }

}
