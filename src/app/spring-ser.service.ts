import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpringSerService {

  constructor(private http:HttpClient) { }

  authheader:string="";
  url:string="http://localhost:8080/";
  authSpring(username:string,password:string){
    this.authheader='Basic '+btoa(username+":"+password);
     var headers= new HttpHeaders({Authorization:this.authheader});
     return this.http.get(this.url+"authenticate",{headers}).pipe(
      map(data=>{
        console.log(data);
      })
     );
  }
  getFromSpringBoot(endpnt:string){
    return this.http.get(this.url+endpnt);
  }
  getAuthHeader():string{
    return this.authheader;
  }
}
