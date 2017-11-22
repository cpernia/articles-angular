import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetUserService } from '../../../get-user.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';
import * as ArticleActions from '../store/article.actions';
import { Article } from '../article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['../../../../../assets/shared-css/articles-card.css', './my-articles.component.css']
})
export class MyArticlesComponent implements OnInit, OnDestroy {
  user: any;
  userSubscription: Subscription;
  myArticlesSubscription: Subscription;
  myArticles: Article[];

  constructor(private getUserService: GetUserService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    this.user = this.getUserService.firebaseUser;
    this.userSubscription =  this.getUserService.user.subscribe(
      (user: any) => {
        this.user = user;
      }
    );
    this.myArticlesSubscription = this.store.select('articles').subscribe(
      (data) => {
        this.myArticles = data.myArticles;
      }
    );
    if (this.user) {
      this.store.dispatch(new ArticleActions.TryFetchMyArticles(this.user.uid));
    }
  }

  toEdit(articleID: number) {
    this.router.navigate([`/articles/${articleID}/edit`]);
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.myArticlesSubscription.unsubscribe();
  }

}
