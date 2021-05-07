import { Component, OnInit } from '@angular/core';
import {User} from './../../Users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login:boolean = false;
  user_name:string ="";
  user_email:string ="";
  user_role:string ="";
  user_id:string ="";
  constructor() { }

  ngOnInit(): void {
    this.user_name = localStorage.getItem('user_name')?.slice(1,-1) || "";
    this.user_email = localStorage.getItem('user_email')?.slice(1,-1) || "";
    this.user_role = localStorage.getItem('user_role')?.slice(1,-1) || "";
    this.user_id = localStorage.getItem('user_id')?.slice(1,-1) || "";

    if(this.user_id!="")
      this.login=true;

  }

  logout(){
    localStorage.clear();
  }

  


}
