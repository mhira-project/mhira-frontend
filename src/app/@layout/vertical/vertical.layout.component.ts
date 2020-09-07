import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-layout',
  templateUrl: './vertical.layout.component.html',
  styleUrls: ['./vertical.layout.component.scss'],
})
export class VerticalLayoutComponent implements OnInit {
  isCollapsed = false;
  user: any;

  constructor() {}

  ngOnInit(): void {}
}
