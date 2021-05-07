import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PaymentService } from './../../payment.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  
})
export class PaymentComponent implements OnInit {
  amount:string="";
  order_id:string="";
  payment_id:string="";
  order_sign:string="";


  constructor(private http:HttpClient,private winRef:PaymentService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    
    //console.log(form);
    //this.router.navigate(['/login']);
    
    if (form.valid) {
      
      const params = {
        amount : form.value.amount,
        currency: "INR",
        receipt: "su001",
        payment_capture: '1'
      }

      this.http.post<any>('https://myapiorg.herokuapp.com/api/payment/order/',params)
      .subscribe((res)=>{
        console.log(res);
        this.order_id = res.sub.id;
      },
      (error) => {}
      );
     
    }
    
  }

  checkout(){
    var options:any = {
      "key": "rzp_test_IR4ybwAOzsDOpn",  //Enter your razorpay key
      "currency": "INR",
      "name": "Razor Tutorial",
      "description": "Razor Test Transaction",
      "image": "https://previews.123rf.com/images/subhanbaghirov/subhanbaghirov1605/subhanbaghirov160500087/56875269-vector-light-bulb-icon-with-concept-of-idea-brainstorming-idea-illustration-.jpg",
      "order_id": this.order_id,
      "handler":  (res:any)=>{
        console.log(res);   
          this.payment_id =res.razorpay_payment_id;
          //document.getElementById('order-id').value=response.razorpay_order_id;
          this.order_sign = res.razorpay_signature;
      },
      "theme": {
          "color": "#227254"
      }
    };
    
    var rzp1 = new this.winRef.nativeWindow.Razorpay(options);// razorpay(options);
    rzp1.open();
    console.log(this.payment_id);
    console.log(this.order_sign);

  }

}
