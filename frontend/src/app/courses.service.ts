import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Course} from './courses';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http:HttpClient,private route:Router) { }

  getAllCourses(){
    
    let courses : Course[] = [];

    this.http.get<any>("https://myapiorg.herokuapp.com/api/v1/courses/").subscribe(
      data => {
        data.data.forEach((value: Course, key: string) => {
          courses.push(value);
        });
      }
    );
    return courses;

  }

  async  getMyCartCourses(user_id:string){
    
    let courses : Course[] = [];

    const temp =  await  this.http.post<any>("https://myapiorg.herokuapp.com/api/v1/edit_user/getCartCourses",{id:user_id})
      .toPromise().then(res=>{
        courses = res.data;
        console.log(res.data);
      })

   return courses;

  }

  async getCoursesByIds(ids:string[]){
   let courses : Course[] = [];
   const temp =  this.http.post<any>("https://myapiorg.herokuapp.com/api/v1/edit_user/getCoursesByIds",{ids}).subscribe(
            res => {
              courses = res.data;
              return courses;
            }
      )

  }




  /*
  getMyCourses(user_id:string){
    
    let courses : Course[] = [];

    this.http.get<any>("http://localhost:5000/api/v1/edit_user/getMyCourses").subscribe(
      data => {
        if(data.success){
          const ids = data.data;
          this.http.post<any>("http://localhost:5000/api/v1/edit_user/getCoursesByIds",ids).subscribe(
            res => {
              courses = res.data;
            }
          )

        }else{

        }
        
      }
    );
    return courses;

  }
  */

  async getMyCourses(user_id:string){
    
    let courses : Course[] = [];

    const temp =  await  this.http.post<any>("https://myapiorg.herokuapp.com/api/v1/edit_user/getMyCourses",{id:user_id})
      .toPromise().then(res=>{
        courses = res.data;
        console.log(res.data);
      })

    return courses;
  }

}
