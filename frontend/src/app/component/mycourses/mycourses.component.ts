import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Course} from './../../courses';
import {CoursesService} from './../../courses.service';





@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {

  courses:Course[] = [];
  display : string = "none";

  constructor(private http:HttpClient,private router:Router,private courseService:CoursesService ) { }

  async ngOnInit() {

    if (localStorage.getItem("user_email") === null) {
      this.router.navigate(['/login']);
    }else{
    this.courses =  await this.courseService.getMyCourses("607ae57738c8fa33bc0b3106"); 
    }
  }

  
  viewDetailClick(){
    if(this.display=="none"){
      this.display="block";
    }else{
      this.display="none";
    }

  }

  watchNow(name:string){
    this.router.navigate(['/play-mycourse',name]);
  }

}
