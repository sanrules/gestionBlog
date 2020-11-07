import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Post } from '../api.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  id: string;
  post: Post;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.post = {};
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });

    this.getPost();
  }

  async getPost() {
    try {
      this.post = await this.apiService.getPostById(this.id);
    } catch (error) {
      console.log(error);
    }
  }

}
