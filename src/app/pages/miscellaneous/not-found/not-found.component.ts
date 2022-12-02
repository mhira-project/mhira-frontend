import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  user: any;

  constructor() {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')).user;
  }
}
