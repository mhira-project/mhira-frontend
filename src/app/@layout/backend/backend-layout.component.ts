import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backend-layout',
  templateUrl: './backend-layout.component.html',
  styleUrls: ['./backend-layout.component.scss'],
})
export class BackendLayoutComponent implements OnInit {
  isCollapsed = false;
  user: any;

  constructor() {}

  ngOnInit(): void {}
}
