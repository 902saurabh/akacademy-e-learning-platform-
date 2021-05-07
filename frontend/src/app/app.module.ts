import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {NgxLocalStorageModule} from 'ngx-localstorage';


import { AppRoutingModule,rountingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './component/index/index.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MycartComponent } from './component/mycart/mycart.component';
import { RupeeConverterPipe } from './rupee-converter.pipe';
import { PaymentComponent } from './component/payment/payment.component';
import { MycoursesComponent } from './component/mycourses/mycourses.component';
import { PlaymycourseComponent } from './component/playmycourse/playmycourse.component';
import { ArticleComponent } from './component/article/article.component';
import { FooterComponent } from './component/footer/footer.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    
    rountingComponent,
         IndexComponent,
         NavbarComponent,
         MycartComponent,
         RupeeConverterPipe,
         PaymentComponent,
         MycoursesComponent,
         PlaymycourseComponent,
         ArticleComponent,
         FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule  ,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,

    NgxLocalStorageModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
    
  ]
 
})
export class AppModule { }
