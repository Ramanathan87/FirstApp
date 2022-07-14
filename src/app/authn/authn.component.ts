import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from './UserModel';
interface CRE { email: string, password: string }
@Component({
  selector: 'app-authn',
  templateUrl: './authn.component.html',
  styleUrls: ['./authn.component.css']
})
export class AuthnComponent implements OnInit {

  active=false;
  like(){
    this.active=!this.active;
  }
  islogin: boolean = false;
  isAuthn: boolean = false;
  error: string = "";
  constructor(private authSer: AuthService, private router: Router) { }
  switchAuth() {
    this.islogin = !this.islogin;
  }
  ngOnInit(): void {
    var isUser:User|null = this.authSer.autoLogin();
    if(isUser){
      console.log("AutoLogin Token AuthComp : "+isUser.token);
      this.router.navigate(['home']);
      this.authSer.autoLogOut();
    }
    else{
      isUser=null;
      localStorage.clear();
    }
    
  }
  onSubmit(form: NgForm) {
    
    console.log(form.value);
    const cre: CRE = {
      email: form.value.email,
      password: form.value.password
    }
    this.isAuthn = true;
    if (this.islogin) {
      this.authSer.newLogin(cre).then((res) => {
        if (res.user?.refreshToken !== '') {

          console.log(res);
          res.user?.getIdToken(true).then((token)=>{
            
            // console.log(token);
            console.log("Token Login : "+token);
            this.authSer.newUser(res.user?.email,res.user?.uid,token).subscribe(sub=>{
              if(sub){
                  alert("User Creater Successfull");
              }
            });
          }); 
        }
        else {
          this.error = "Something went wrong"
        }
        this.isAuthn = false;

      }, error => {
        console.log(error.message);
        this.isAuthn = false
        this.error = error.message
      })
    }

    else {

      this.authSer.signUp(cre).then((res) => {
        if (res.user?.refreshToken !== '') {
          console.log(res);
          res.user?.getIdToken(true).then((token)=>{
           
            // console.log(token);
            console.log("Token SignUp : "+token);
            this.authSer.newUser(res.user?.email,res.user?.uid,token).subscribe(sub=>{
              if(sub){
                this.router.navigate(['home']);
                // this.authSer.autoLogOut();
              }
            });
          });
          
          
        }
        else {
          this.error = "Something went wrong"
        }
        // this.isAuthn = false;

      }, error => {
        console.log(error.message);
        this.isAuthn = false
        this.error = error.message

      })
    }




  }

}



// this.authSer.signUp(cre).subscribe((sub)=>{
      //   console.log(sub);
      //   form.reset();
      //   // this.router.navigate(['home']);
      // },error=>{
      //   console.log(error.message);
      // })