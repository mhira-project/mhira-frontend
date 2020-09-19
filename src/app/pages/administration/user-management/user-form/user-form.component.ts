import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user:any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.user = JSON.parse(params.user);
        this.route.data.subscribe(data=>{
          data['title'] = `${this.user.firstName} ${this.user.lastName}`;
        })
        }
      );
  }


}
