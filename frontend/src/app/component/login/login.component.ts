import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-localstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email="";
  password="";


  constructor(private http:HttpClient,private router:Router,private localStorage :LocalStorageService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    
    //console.log(form);
    //this.router.navigate(['/login']);
    
    if (form.valid) {
      this.http.post<any>('https://myapiorg.herokuapp.com/api/v1/auth/login/',form.value)
      .subscribe((res)=>{
        console.log(res);
       
       localStorage.setItem('user_name',JSON.stringify(res.data.name));
       localStorage.setItem('user_email',JSON.stringify(res.data.email));
       localStorage.setItem('user_id',JSON.stringify(res.data._id));
       localStorage.setItem('user_role',JSON.stringify(res.data.role));
       this.router.navigate(['/index', res ]);

      },
      (error) => {}
      );
     
    }
    
  }




}
