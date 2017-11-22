import { Component, OnDestroy, OnInit } from '@angular/core';

import { GetUserService } from '../../get-user.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import * as ArticleActions from './store/article.actions';
import { Article } from './article.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['../../../../assets/shared-css/articles-card.css', './articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  user: any;
  userSubscription: Subscription;
  articlesSubscription: Subscription;
  articles: Article[];

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
    this.articlesSubscription = this.store.select('articles').subscribe(
      (data) => {
        this.articles = data.articles;
      }
    );
    this.store.dispatch(new ArticleActions.TryFetchArticles());
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.articlesSubscription.unsubscribe();
  }

  goToArticle(index: number) {
    this.router.navigate(['/articles', index]);
  }


}
