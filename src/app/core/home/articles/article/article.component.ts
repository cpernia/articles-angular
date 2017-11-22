import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetUserService } from '../../../get-user.service';
import { Subscription } from 'rxjs/Subscription';
import { Article } from '../article.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducer';
import * as ArticleActions from '../store/article.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  user: any;
  userSubscription: Subscription;
  articleSubscription: Subscription;
  article: Article;

  constructor(private getUserService: GetUserService,
              private store: Store<AppState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userSubscription =  this.getUserService.user.subscribe(
      (user: any) => {
        this.user = user;
      }
    );
    this.route.params.subscribe(
      (data) => {
        this.store.dispatch(new ArticleActions.TryFetchArticle(data.id));
      }
    );
    this.articleSubscription = this.store.select('articles').subscribe(
      (data) => {
        this.article = data.articleViewed;
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.articleSubscription.unsubscribe();
  }

}
