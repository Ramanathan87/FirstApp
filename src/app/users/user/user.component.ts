import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user!: {id: number, name: string};
  paramsSubscription!: Subscription;

  constructor(private actroute: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.user = {
      id: this.actroute.snapshot.params['id'],
      name: this.actroute.snapshot.params['name']
    };
    this.paramsSubscription = this.actroute.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
  loadanna(){
    this.router.navigate(['home/users',10,'Anna']);
  }
}
