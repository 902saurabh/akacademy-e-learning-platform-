import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {IndexComponent} from './component/index/index.component';
import { CourseListComponent } from './component/course-list/course-list.component';
import {MycartComponent} from './component/mycart/mycart.component';
import {PaymentComponent} from './component/payment/payment.component';
import {MycoursesComponent} from './component/mycourses/mycourses.component';
import {PlaymycourseComponent} from './component/playmycourse/playmycourse.component';
import {ArticleComponent} from './component/article/article.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'index',component:IndexComponent},
  {path:'course-list',component:CourseListComponent},
  {path:'my-cart',component:MycartComponent},
  {path:'payment',component:PaymentComponent},
  {path:'my-courses',component:MycoursesComponent},
  {path:'play-mycourse/:name',component:PlaymycourseComponent},
  {path:'article/:uri',component:ArticleComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rountingComponent = [LoginComponent,RegisterComponent,
  IndexComponent,CourseListComponent,MycartComponent,ArticleComponent];
