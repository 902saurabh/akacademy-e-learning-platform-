import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  

  name = "";
  email = "";
  role = "";
  password= "";

  constructor(private http:HttpClient,private router:Router){}

  onSubmit(form: NgForm) {
    
    //console.log(form);
    //this.router.navigate(['/login']);
    
    if (form.valid) {
      
      this.http.post('https://myapiorg.herokuapp.com/api/v1/auth/register/',form.value)
      .subscribe((res)=>{
        console.log(res);
       this.router.navigate(['/login']);
      },
      (error) => {}//console.log(error)
      );
      
     //console.log(form);
     
    }
    
  }



}
