import { Observable } from "rxjs";

export class User{
    constructor(public email:string,public id:string,private _token:string){
        console.log("In User Model");
        
        // console.log(email);
        // console.log(id);
        // console.log(_token);
        
    }
    get token():any{
        if(this._token!==undefined){
            return this._token;
        }
        return null;
    }
}