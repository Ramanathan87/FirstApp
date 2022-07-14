import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { SpringSerService } from '../spring-ser.service';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authSer: AuthService,private service:SpringSerService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let searchParams = req.params;
    searchParams = searchParams.append('auth', this.authSer.getToken());
    if (!(req.url.includes("http://localhost:8080/"))) {
      const modifiedRequest = req.clone({
        headers: req.headers.append('Access-Control-Allow-Origin', 'http://localhost:8080'),
        params: searchParams
      });
      return next.handle(modifiedRequest);
    }
    else{
      var authhead=this.service.getAuthHeader();
      const headers = new HttpHeaders({
        'Authorization':authhead,
        'Access-Control-Allow-Origin': 'http://localhost:8080'
      });
      if(authhead!==""){
        const sbreq=req.clone({
          headers:headers
        })
        console.log('Auth Interceptor -  request');
        return next.handle(sbreq);
      }
    }
    return next.handle(req);
   
    

  }
}
