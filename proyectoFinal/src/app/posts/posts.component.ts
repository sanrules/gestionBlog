import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getPosts();
  }

  async getPosts() {
    try {
      this.posts = await this.apiService.getPosts();
    } catch (error) {
      console.log(error);
    }
  }

  navigate(id) {
    this.router.navigate(['posts/' + id]);
  }

  edit(id) {
    this.router.navigate(['posts/edit/' + id]);
  }

  borrar(id) {
    if (window.confirm('¿Desea borrar el post? Esta acción no se puede deshacer')) {
      this.apiService.deletePost(id)
        .then((result) => {
          console.log('Resultado borrado: ', result);
          this.getPosts();
        }).catch((err) => {
          console.log('Error borrado: ', err);
        });
    }
  }

}
