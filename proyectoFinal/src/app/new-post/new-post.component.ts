import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../api.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  isNew: boolean;
  id: string;
  formulario: FormGroup;
  post: Post;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    this.post = {

    };
    this.isNew = true;
    this.formulario = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      author: new FormControl(''),
      category: new FormControl('', [
        Validators.required
      ]),
      _id: new FormControl()
    });
  }

  ngOnInit(): void {
    console.log('nuevo');
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });

    if (this.id != null) {
      this.isNew = false;
      this.apiService.getPostById(this.id)
        .then((result) => {
          this.formulario.patchValue(result);
        }).catch((err) => {
          console.log(err);
        });
    } else {
      Object.keys(this.formulario.controls).forEach(key => {
        if (key !== '_id') {
          this.formulario.controls[key].setValidators(Validators.required);
        }
      });
    }
  }

  onSubmit() {
    if (this.isNew) {
      console.log('Creación de un nuevo post');
      console.log(this.formulario.value);
      this.apiService.createPost(this.formulario.value)
        .then((result) => {
          console.log(result);
          this.router.navigate(['posts']);
        }).catch((err) => {
          console.log(err);
        });
    } else {
      console.log('Edición de un post');
      const form = this.formulario.value;
      this.apiService.editPost(form)
        .then((result) => {
          console.log('resultado', result);
          this.router.navigate(['posts/' + form._id]);
        }).catch((err) => {
          console.log('error', err);
        });
    }

  }

}
