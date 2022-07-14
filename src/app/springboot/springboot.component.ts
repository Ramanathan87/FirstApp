import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SpringSerService } from '../spring-ser.service';

@Component({
  selector: 'app-springboot',
  templateUrl: './springboot.component.html',
  styleUrls: ['./springboot.component.css']
})
export class SpringbootComponent implements OnInit {

  constructor(private service:SpringSerService) { }
  employee:any;
  error:string="";
  authSuccess:boolean=false;
  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    console.log(form.value);
    this.service.authSpring(form.value.username,form.value.pwd).subscribe(sub=>{
      console.log(sub);
      this.authSuccess=true;
    },error=>{
      this.error=error.message;
      this.authSuccess=false;
    })
  }
  onHandleError(){
    this.error="";  
  }
  getfromspringboot(endpnt:string){
    this.service.getFromSpringBoot(endpnt).subscribe(sub=>{
      console.log("getFromSpringBoot");
      console.log(sub);
      this.employee=sub;
    },error=>{
      this.error=error.message+" : Unauthorized";
    });
    
  }

}
