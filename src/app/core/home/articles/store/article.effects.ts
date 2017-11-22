
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'rxjs/add/operator/do';
import { of } from 'rxjs/observable/of';

import * as ArticleActions from './article.actions';
import { fromPromise } from 'rxjs/observable/fromPromise';
import DataSnapshot = firebase.database.DataSnapshot;
import { Article } from '../article.model';
import { Router } from '@angular/router';

@Injectable()
export class ArticleEffects {

@Effect()
fetchArticles = this.actions$
  .ofType(ArticleActions.TRY_FETCH_ARTICLES)
  .switchMap( () => {
      return fromPromise(firebase.database().ref(`/articles`).once('value'))
      .switchMap(( result ) => {
        const returnArr = [];
        result.forEach(function(childSnapshot) {
          // const item = childSnapshot.val();
          // item.key = childSnapshot.key;
          returnArr.push(childSnapshot.val());
        });
        return of ({
          type: ArticleActions.FETCH_ARTICLES,
          payload: returnArr
        });
      });
  });

  @Effect()
  fetchArticle = this.actions$
    .ofType(ArticleActions.TRY_FETCH_ARTICLE)
    .map( (action: ArticleActions.TryFetchArticle) => {
        return action.payload;
    })
    .switchMap( (index: string) => {
      return fromPromise(firebase.database().ref(`/articles/${index}`).once('value'))
        .switchMap(( result: DataSnapshot  ) => {
          return of ({
            type: ArticleActions.FETCH_ARTICLE,
            payload: result.val()
          });
        });
    });

  @Effect()
  fetchMyArticles = this.actions$
    .ofType(ArticleActions.TRY_FETCH_MY_ARTICLES)
    .map( (action: ArticleActions.TryFetchMyArticles) => {
      return action.payload;
    })
    .switchMap( (uid: string) => {
      return fromPromise(firebase.database().ref(`/users/${uid}/articles`).once('value'))
        .switchMap(( result ) => {
          const returnArr = [];
          result.forEach(function(childSnapshot) {
            // const item = childSnapshot.val();
            // item.key = childSnapshot.key;
            returnArr.push(childSnapshot.val());
          });
          return of ({
            type: ArticleActions.FETCH_MY_ARTICLES,
            payload: returnArr
          });
        });
    });

  @Effect()
  fetchArticleEdit = this.actions$
    .ofType(ArticleActions.TRY_FETCH_ARTICLE_EDIT)
    .map( (action: ArticleActions.TryFetchArticleEdit) => {
      return action.payload;
    })
    .switchMap( (index: string) => {
      return fromPromise(firebase.database().ref(`/articles/${index}`).once('value'))
        .switchMap(( result: DataSnapshot  ) => {
          return of ({
            type: ArticleActions.FETCH_ARTICLE_EDIT,
            payload: result.val()
          });
        });
    });

  @Effect({dispatch: false})
  updateArticle = this.actions$
    .ofType(ArticleActions.UPDATE_ARTICLE)
    .map( (action: ArticleActions.UpdateArticle) => {
      return action.payload;
    })
    .switchMap( (data: { article: Article, uid: string }) => {
      const articleTemporal = {
        id: data.article.id,
        category: data.article.category,
        imgPath: data.article.imgPath,
        resume: data.article.resume,
        title: data.article.title
      };
      const updates = {};
      updates['/articles/' + data.article.id] = data.article;
      updates['/users/' + data.uid + '/articles/' + data.article.id] = articleTemporal;

      return fromPromise(firebase.database().ref().update(updates))
        .do(() => {
          this.router.navigate([`/articles`]);
        });
    });

  @Effect({dispatch: false})
  deleteArticle = this.actions$
    .ofType(ArticleActions.DELETE_ARTICLE)
    .map( (action: ArticleActions.DeleteArticle) => {
      return action.payload;
    })
    .switchMap( (data: {articleId: string, uid: string}) => {
      const updates = {};
      updates['/articles/' + data.articleId] = null;
      updates['/users/' + data.uid + '/articles/' + data.articleId] = null;

      return fromPromise(firebase.database().ref().update(updates))
        .do(() => {
          this.router.navigate([`/articles`]);
        });
    });

  @Effect({dispatch: false})
  saveArticle = this.actions$
    .ofType(ArticleActions.SAVE_ARTICLE)
    .map( (action: ArticleActions.UpdateArticle) => {
      return action.payload;
    })
    .switchMap( (data: { article: Article, uid: string, user: string }) => {

        const itemID = firebase.database().ref('/articles/').push();
      const articleTemporal = {
        category: data.article.category,
        date: data.article.date,
        description: data.article.description,
        id: itemID.key,
        imgPath: data.article.imgPath,
        owner: data.user,
        resume: data.article.resume,
        title: data.article.title
      };
      return fromPromise(firebase.database().ref(`/articles/${itemID.key}`).update(articleTemporal))
        .switchMap(() => {
          const articleTemporal2 = {
            id: articleTemporal.id,
            category: data.article.category,
            imgPath: data.article.imgPath,
            resume: data.article.resume,
            title: data.article.title
          };
          return (
            fromPromise(firebase.database()
              .ref('/users/' + data.uid + '/articles/' + articleTemporal.id).set(articleTemporal2))
          )
          .do(() => {
            this.router.navigate([`/articles`]);
          });
        });
    });

  constructor(private actions$: Actions, private router: Router) {}
}
