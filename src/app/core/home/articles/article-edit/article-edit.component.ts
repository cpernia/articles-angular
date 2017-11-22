import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from '../article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUserService } from '../../../get-user.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../store/app.reducer';
import * as ArticleActions from '../store/article.actions';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  mode: string;
  articleForm: FormGroup;
  article: Article;
  user: any;
  subscription: Subscription;

  constructor(private router: Router,
              private getUserService: GetUserService,
              private route: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.user = this.getUserService.firebaseUser;
    this.subscription =  this.getUserService.user.subscribe(
      (user: any) => {
        this.user = user;
      }
    );
    if (this.router.url.includes('new')) {
      this.mode = 'New';
    } else {
      this.mode = 'Edit';
      this.route.params.subscribe(
        (data) => {
          this.store.dispatch(new ArticleActions.TryFetchArticleEdit(data.id));
        }
      );
      this.store.select('articles').subscribe(
        (data) => {
          this.article = data.articleToEdit;
          if (this.article) {
            this.initForm();
          }
        }
      );
    }
    this.initArticle();
    this.initForm();
  }

  initArticle() {
    this.article = {
      id: null,
      title: '',
      resume: '',
      description: '',
      category: '',
      imgPath: '',
      owner: '',
      date: 0
    };
  }

  initForm() {
    this.articleForm = new FormGroup({
      'title': new FormControl(this.article.title, [Validators.required]),
      'resume': new FormControl(this.article.resume, [Validators.required]),
      'description': new FormControl(this.article.description, [Validators.required]),
      'category': new FormControl(this.article.category.toLowerCase(), [Validators.required]),
      'imgPath': new FormControl(this.article.imgPath, [Validators.required]),
    });
  }

  goToMyArticles() {
    this.router.navigate(['/my-articles']);
  }

  changeCategory(event) {
    this.article.category = event.target.value;
  }

  deleteArticle(articleId: string) {
    this.store.dispatch(new ArticleActions.DeleteArticle({ articleId, uid: this.user.uid }));
  }

  submitForm() {
    console.log(this.user);
    if (this.mode === 'New' && this.user) {
      console.log('New');
      const username: string = this.user.email;
      const articleToSend: Article = {
        ...this.article,
        id: 656,
        owner: 'test@test.com',
        date: Date.now(),
        title: this.articleForm.controls['title'].value,
        resume: this.articleForm.controls['resume'].value,
        description: this.articleForm.controls['description'].value,
        imgPath: this.articleForm.controls['imgPath'].value,
        category: this.articleForm.controls['category'].value
      };
      this.store.dispatch(new ArticleActions.SaveArticle({
        article: articleToSend,
        uid: this.user.uid,
        user: username
      }));
    } else if (this.user) {
      const articleToSend: Article = {
        ...this.article,
        title: this.articleForm.controls['title'].value,
        resume: this.articleForm.controls['resume'].value,
        description: this.articleForm.controls['description'].value,
        imgPath: this.articleForm.controls['imgPath'].value,
        category: this.articleForm.controls['category'].value
      };
      this.store.dispatch(new ArticleActions.UpdateArticle({article: articleToSend, uid: this.user.uid}));
    }
  }

}
