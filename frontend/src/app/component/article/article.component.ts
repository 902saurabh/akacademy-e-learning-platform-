import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,RouterModule} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Article} from './../../Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  uri:string = "";
  article:Article[] = [];
  articles:Article[] = [];
  constructor(private router:Router,private route:ActivatedRoute,private http:HttpClient) {
    this.uri = this.route.snapshot.params.uri;
  }

  async ngOnInit() {
    let temp = await this.getArticle();
    let temp2 = await this.getLatestArticles();
    
  }
  async getArticle(){

    let art = await this.http.post<any>("https://myapiorg.herokuapp.com/getOneArticle",{uri:this.uri}).toPromise().then(data=>{
        this.article.push(data);
    });
  }

  async getLatestArticles(){

    let art = await this.http.get<any>("https://myapiorg.herokuapp.com/getArticles").toPromise().then(data=>{
        this.articles = data;
        
    });

  }
  
}
