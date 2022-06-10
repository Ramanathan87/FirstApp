import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { User } from '../authn/UserModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  userobs!:Subscription
  loginstatus:boolean=false;
  UserAuth:{email:string,id:string}={
    email: '',
    id: ''
  }
  constructor(private router: Router, private authService: AuthService,private actroute:ActivatedRoute) {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }
  ngOnInit() {

    this.loginstatus=this.authService.loggedIn;
    const userobj:User|null=this.authService.getUserSub();
    if(userobj==null){
      this.router.navigate(['auth']);
    }
    else{
      console.log("---Home Componenet---");
      // console.log(userobj.email);
      // console.log(userobj.id);
      // console.log(userobj.token);
      this.UserAuth.email=userobj.email;
      this.UserAuth.id=userobj.id;
      this.onLogin();
    }
   
    // this.authService.userSub.subscribe(sub=>{
    //   console.log("----In Home Comp----");
    //   console.log(sub);
    //   this.onLogin();
      
    // })
    
  }

  onLoadServer(id: number) {
    // complex calculation

    this.router.navigate(['servers',id,'edit'], {relativeTo: this.actroute,queryParams: {allowEdit: '1'}, fragment: 'loading'});
    console.log(this.router.url);
    
  }

  onLogin() {
    this.authService.login();
    this.loginstatus=this.authService.loggedIn;
  }

  onLogout() {
    this.authService.logout();
    this.loginstatus=this.authService.loggedIn;
  }

  serverId: number = 10;
  serverStatus: string = 'offline';
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Testserver';

  
  ngOnDestroy(): void {
    // this.userobs.unsubscribe();
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
  showSecret = false;
  log:Date[] = [];

  onToggleDetails() {
    this.showSecret = !this.showSecret;
    // this.log.push(this.log.length + 1);
    this.log.push(new Date());
  }
}

