import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  user:any;
  mySubscription:any;

  constructor(private route: ActivatedRoute, private router: Router, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.onChangeUser()

  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  onChangeUser(){


  }


}
