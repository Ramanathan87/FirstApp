import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable({
    providedIn: 'root'
})
export class AuthNGuard implements CanActivate {
    constructor(private authSer: AuthService,private router:Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(this.authSer.getUserSub());
        var isAuth=this.authSer.getUserSub();
        if(isAuth!==null){
            return true;
        }
        else{
            // this.router.navigate(['error']);
            return this.router.createUrlTree(['error']);
        }
        // return isAuth !== null ? true : false;
        
    }
    
    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
        return this.canActivate(route, state);
    }

    canDeactivate(
        component: CanComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): Observable<any> | Promise<boolean> | boolean {
        // console.log(component.canDeactivate());
        return component.canDeactivate();
        // return this.authService.canDeactivate();

    }

}