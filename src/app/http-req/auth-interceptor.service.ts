import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authSer:AuthService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let searchParams = req.params;
    searchParams = searchParams.append('auth', this.authSer.getToken());
    const modifiedRequest = req.clone({
      headers: req.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200/'),
      params:searchParams
    });
    console.log('Auth Interceptor -  request');
    // console.log(modifiedRequest.url);
    // console.log(modifiedRequest.headers);
    return next.handle(modifiedRequest);
  }
}
