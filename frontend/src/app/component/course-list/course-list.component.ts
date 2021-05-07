import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavbarComponent} from './../navbar/navbar.component'
import {CoursesService} from './../../courses.service';
import {HttpClient} from '@angular/common/http';
import {Course} from './../../courses';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses : Course[] = [];
  display : string = "none";
  constructor(private coursesService:CoursesService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.courses = this.coursesService.getAllCourses();
  }

  addToCart(course_id: string){

    if (localStorage.getItem("user_email") === null) {
      this.router.navigate(['/login']);
    }else{

        this.http.post<any>('https://myapiorg.herokuapp.com/api/v1/edit_user/addToCart/',{
          id:"607ae57738c8fa33bc0b3106",
          courseId:course_id
        }).subscribe(res=>{
          alert(res.msg);
        });

    }
  }

  viewDetailClick(){
    if(this.display=="none"){
      this.display="block";
    }else{
      this.display="none";
    }

  }



}
