import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from './config';
import { URLSearchParams } from '@angular/http';

/*
  Generated class for the WpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WpService {

	  url: any;
	  post: any;
    posts: any;
    status: any;
    categories: any;

  constructor(public http: Http, public config: Config) {
     this.url = this.config.url;
  }
   
	load() {
    return new Promise(resolve => {
      this.http.get(this.config.url + '/api/core/get_category_index/').map(res => res.json())
        .subscribe(data => {
          this.categories = data;
          console.log(this.categories);
          resolve(this.categories);
        });
    });
  }


  getPosts(id) {
    return new Promise(resolve => {
      this.http.get(this.config.url + '/api/core/get_category_posts/?id=' + id).map(res => res.json())
        .subscribe(data => {
          this.posts = data;
          resolve(this.posts);
       });
    });
  }


  getPost(id) {
    return new Promise(resolve => {
      this.http.get(this.config.url + '/?json=get_post&post_id=' + id)
        .map(res => res.json())
        .subscribe(data => {
          this.post = data;
          resolve(this.post);
        });
    });
  }



  submitComment(form){
    var params =new URLSearchParams();
    params.append("content", form.comment);
    params.append("name", form.name);
    params.append("email", form.email);
    params.append("post_id", form.post_id);

    return new Promise(resolve => {
      this.http.post(this.config.url + '/?json=respond.submit_comment', params).map(res => res.json())
      .subscribe(data =>{
        this.status = data;
        resolve(this.status);
        }, err => resolve(JSON.parse(err._body)));
    });
  }
 

}
