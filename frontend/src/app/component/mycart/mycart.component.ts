import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from './../navbar/navbar.component'
import {CoursesService} from './../../courses.service';
import {HttpClient} from '@angular/common/http';
import {Course} from './../../courses';
import {Router} from '@angular/router';
import {PaymentService} from './../../payment.service';


@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  courses : Course[] = [];
  
  display : string = "none";
  order_id:string = "";
  payment_id:string = "";
  order_sign:string = "";

  constructor( private courseService :CoursesService,private http:HttpClient,private winRef:PaymentService,private router:Router) { }

  async ngOnInit() {
    if (localStorage.getItem("user_email") === null) {
      this.router.navigate(['/login']);
    }else{
      this.courses =  await this.courseService.getMyCartCourses("607ae57738c8fa33bc0b3106"); 
    }
      
  }

  viewDetailClick(){
    if(this.display=="none"){
      this.display="block";
    }else{
      this.display="none";
    }

  }

  onClickRemove(course_id:string){

    this.http.post<any>('https://myapiorg.herokuapp.com/api/v1/edit_user/removeFromCart/',{
      id:"607ae57738c8fa33bc0b3106",
      courseId:course_id
    }).subscribe(res=>{
      alert(res.msg);
      this.ngOnInit();
    });

  }

  onClickBuyNow(cost:string,course_id:string){
    //console.log(cost);
    cost += "00";
    const params = {
      amount : cost,
      currency: "INR",
      receipt: "su001",
      payment_capture: '1'
    }

    this.http.post<any>('https://myapiorg.herokuapp.com/api/payment/order/',params)
    .subscribe((res)=>{
  
      console.log(res);
      if(res.status === "success"){
        this.order_id = res.sub.id;

        var options:any = {
          "key": "rzp_test_IR4ybwAOzsDOpn",  //Enter your razorpay key
          "currency": "INR",
          "name": "Ak academy",
          "description": "Razor Test Transaction",
          "image": "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
          "order_id": this.order_id,
          "handler":  (res:any)=>{
            console.log(res);
              this.payment_id =res.razorpay_payment_id;
              //document.getElementById('order-id').value=response.razorpay_order_id;
              this.order_sign = res.razorpay_signature;

              this.http.post<any>('api/v1/edit_user/addToMycourse/',{
                id:"607ae57738c8fa33bc0b3106",
                courseId:course_id
              }).subscribe(res=>{
                alert(res.msg);
                this.ngOnInit();
              });



          },
          "theme": {
              "color": "#227254"
          }
        };
        
        var rzp1 = new this.winRef.nativeWindow.Razorpay(options);// razorpay(options);
        rzp1.open();

      }
      

    },
    (error) => {}
    );
    
   
  }

}
