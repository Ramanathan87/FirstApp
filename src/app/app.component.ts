import { Component } from '@angular/core';
import { AuthService } from './auth.service';
var num1=12
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  num2=13;
  static num3=10;

  constructor(private authSer:AuthService){
    this.authSer.autoLogin();
    console.log(num1);
    

  }
}
