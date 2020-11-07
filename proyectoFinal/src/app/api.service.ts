import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Post {
  _id?: string;
  title?: string;
  content?: string;
  category?: string;
  author?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://gestion-blog.herokuapp.com/api/posts';
  }

  getPosts(): Promise<any> {
    return this.http.get(this.baseUrl).toPromise();
  }

  getPostById(id: string): Promise<any> {
    return this.http.get(this.baseUrl + '/' + id).toPromise();
  }

  createPost(post: Post): Promise<any> {
    return this.http.post(this.baseUrl, post).toPromise();
  }

  editPost(post: Post): Promise<any> {
    console.log('post a editar', post);
    return this.http.put(this.baseUrl, post).toPromise();
  }

  deletePost(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/' + id).toPromise();
  }
}
