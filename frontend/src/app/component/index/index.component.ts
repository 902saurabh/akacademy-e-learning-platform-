import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import {Course} from './../../courses';
import {CoursesService} from './../../courses.service';
import {} from './../navbar/navbar.component';
import {Article} from './../../Article';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  courses : Course[] = [];
  articles : Article[] =  [];
  constructor( private router:Router,private route:ActivatedRoute,private http:HttpClient,
    
    private coursesService: CoursesService

    ) {
    //this.router.getCurrentNavigation()
    //data = this.router.getCurrentNavigation().extras.state;
    this.route.params.subscribe(params=>{
      const data = JSON.stringify(params);
      //const tokenInfo = this.getDecode
      //const decoded = jwt.verify(token, "your secret or key");  
      //var userId = decoded.user_data.user_id  
      //console.log(userId)  
      
    })
   }



  //test = {success:String,data:Array<Object>};
  async ngOnInit() {  
    
    this.courses = await this.coursesService.getAllCourses();
    let temp = await this.getLatestArticles();

  }

  arrayOne(n: number): any[] {
    return Array(n);
  }
  async getLatestArticles(){

    let art = await this.http.get<any>("https://myapiorg.herokuapp.com/getArticles").toPromise().then(data=>{
        this.articles = data;
        /*
        data.data.forEach((value: Course, key: string) => {
          courses.push(value);
        });
        */
        //console.log(res);
    });

    console.log(this.articles);
    
  }



}
