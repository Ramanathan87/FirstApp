import { Observable } from "rxjs";

export class AuthService {
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
    this.loggedIn = false;
  }
}
