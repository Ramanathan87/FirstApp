
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from '../app/authn/UserModel';
interface AuthResData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSub= new Subject<User>();
  private token!:string;
  private userOBj!:User | null;
  constructor( private router: Router,
    public auth: AngularFireAuth,
    private http: HttpClient) 
    { }

  loggedIn = false;

  isAuthenticated() {
    var obs=new Observable((obs)=>{
      setTimeout(() => {
        obs.next(this.loggedIn);
      }, 2000);
    });
    // const promise = new Promise(
    //   (resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(this.loggedIn);
    //     }, 800);
    //   }
    // );
    // return promise;
    return obs;
  }
  canDeactivate(){
    var obs=new Observable((obs)=>{
      setTimeout(() => {
        obs.next(window.confirm("Are you Sure..?"));
      }, 2000);
    })
    return obs;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.userOBj=null;
    this.router.navigate(['auth']);
  }
 
  newUser(email:any,id:any,token:any){
    return new Observable((obs)=>{
      this.userOBj= new User(email,id,token);
      this.token=token;
      if(this.userOBj){
        obs.next(true)
        localStorage.setItem('UserData',JSON.stringify(this.userOBj));
        // this.autoLogOut();
      }
      else{
        obs.next(false)
      }
      // this.userSub.next(user);
      // console.log("this.userSub");
      // console.log(this.userSub);
      // if(this.userSub){
      //   obs.next(true)
      // }
      // else{
      //   obs.next(false)
      // }
    })

  }

  autoLogin():User|null{
    var user = localStorage.getItem('UserData');
    if(!!user){
      
      var authuser = JSON.parse(user);
      console.log(authuser);
      this.userOBj=new User(authuser.email,authuser.id,authuser._token);
      this.token=this.userOBj.token;
      console.log(this.token);
      localStorage.setItem('UserData',JSON.stringify(this.userOBj));
      // this.autoLogOut()
      return this.userOBj;
    }
    else{
      return null
    }
  }
  autoLogOut(){
    setTimeout(() => {
      this.logout();
    }, 900000);
  }
  getUserSub():User|null{
    if(this.userOBj){
      return this.userOBj
    }
    return null;
  }
  getToken(){
    return this.token;
  }

  signUp(cred: { email: string, password: string }) {
    return this.auth
    .signInWithEmailAndPassword(cred.email,cred.password);
  }
  newLogin(cred: { email: string, password: string }) {
    return this.auth
    .createUserWithEmailAndPassword(cred.email,cred.password);
  }
}





















 // return this.http.post<AuthResData>(URL, {
    //   email: cred.email,
    //   password: cred.password,
    //   returnSecureToken: true
    // }, {
    //   headers: new HttpHeaders(
    //     {
          
    //     }
    //   )
    // })