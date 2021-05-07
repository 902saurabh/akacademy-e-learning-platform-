import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-playmycourse',
  templateUrl: './playmycourse.component.html',
  styleUrls: ['./playmycourse.component.css']
})
export class PlaymycourseComponent implements OnInit {

  course_name:string="";
  test1:boolean=true;
  test2:boolean=false;
  test3:boolean=false;
  test4:boolean=false;
  test5:boolean=false;
  test7:boolean=false;
  test6:boolean=false;
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.course_name = this.route.snapshot.params.name;

  }

  check1(){
    this.test1 = true;
    this.test2 = false;
    this.test3 = false;
    this.test4 = false;
    this.test5 = false;
    this.test6 = false;
    this.test7 = false;
  }
  check2(){
    
    this.test1 = false;
    this.test2 = true;
    this.test3 = false;
    this.test4 = false;
    this.test5 = false;
    this.test6 = false;
    this.test7 = false;
  }
  check3(){
    this.test1 = false;
    this.test2 = false;
    this.test3 = true;
    this.test4 = false;
    this.test5 = false;
    this.test6 = false;
    this.test7 = false;
  }
  check4(){
    this.test1 = false;
    this.test2 = false;
    this.test3 = false;
    this.test4 = true;
    this.test5 = false;
    this.test6 = false;
    this.test7 = false;
  }
  check5(){
    this.test1 = false;
    this.test2 = false;
    this.test3 = false;
    this.test4 = false;
    this.test5 = true;
    this.test6 = false;
    this.test7 = false;
  }
  check6(){
    this.test1 = false;
    this.test2 = false;
    this.test3 = false;
    this.test4 = false;
    this.test5 = false;
    this.test6 = true;
    this.test7 = false;
  }
  check7(){
    this.test1 = false;
    this.test2 = false;
    this.test3 = false;
    this.test4 = false;
    this.test5 = false;
    this.test6 = false;
    this.test7 = true;
  }


}
