import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  CanDeactivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
export interface CanComponentDeactivate{
  canDeactivate:()=>Observable<boolean>|Promise<boolean>|boolean;
}


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild ,CanDeactivate<CanComponentDeactivate>{
  constructor(private authService: AuthService, private router: Router) {}
  authObs!:Observable<boolean>;
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<any> |Promise<boolean> | boolean{


    
    // this.authService.isAuthenticated().then((auth:)=>{
    //   if(auth){
    //     return true;
    //   }
    //   else{
    //     this.router.navigate(['/'])
    //   }
    // })
    return this.authService.isAuthenticated()
    // return this.authService.isAuthenticated()
    //   .then(
    //     (authenticated: any) => {
    //       if (authenticated) {
    //         return true;
    //       } else {
    //         this.router.navigate(['/']);
    //       }
    //     }
    //   );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
    ): Observable<any>|Promise<boolean>|boolean{
      // console.log(component.canDeactivate());
      return component.canDeactivate();
      // return this.authService.canDeactivate();
      
    }
}  

