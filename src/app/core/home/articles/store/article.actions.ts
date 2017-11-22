import { Action } from '@ngrx/store';
import { Article } from '../article.model';

export const TRY_FETCH_ARTICLES = 'TRY_FETCH_ARTICLES';
export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const TRY_FETCH_ARTICLE = 'TRY_FETCH_ARTICLE';
export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export const TRY_FETCH_MY_ARTICLES = 'TRY_FETCH_MY_ARTICLES';
export const FETCH_MY_ARTICLES = 'FETCH_MY_ARTICLES';
export const TRY_FETCH_ARTICLE_EDIT = 'TRY_FETCH_ARTICLE_EDIT';
export const FETCH_ARTICLE_EDIT = 'FETCH_ARTICLE_EDIT';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const SAVE_ARTICLE = 'SAVE_ARTICLE';

export class TryFetchArticles implements Action {
  readonly type = TRY_FETCH_ARTICLES;

}

export class FetchArticles implements Action {
  readonly type = FETCH_ARTICLES;

  constructor(public payload: Article[]) {}
}

export class TryFetchArticle implements Action {
  readonly type = TRY_FETCH_ARTICLE;

  constructor(public payload: string) {}
}

export class FetchArticle implements Action {
  readonly type = FETCH_ARTICLE;

  constructor(public payload: Article) {}
}

export class TryFetchMyArticles implements Action {
  readonly type = TRY_FETCH_MY_ARTICLES;

  constructor(public payload: string) {}
}

export class FetchMyArticles implements Action {
  readonly type = FETCH_MY_ARTICLES;

  constructor(public payload: Article[]) {}
}

export class TryFetchArticleEdit implements Action {
  readonly type = TRY_FETCH_ARTICLE_EDIT;

  constructor(public payload: string) {}
}

export class FetchArticleEdit implements Action {
  readonly type = FETCH_ARTICLE_EDIT;

  constructor(public payload: Article) {}
}

export class UpdateArticle implements Action {
  readonly type = UPDATE_ARTICLE;

  constructor(public payload: {article: Article, uid: string}) {}
}

export class  DeleteArticle implements Action {
  readonly type = DELETE_ARTICLE;

  constructor(public payload: {articleId: string, uid: string}) {}
}

export class SaveArticle implements Action {
  readonly type = SAVE_ARTICLE;

  constructor(public payload: {article: Article, uid: string, user: string}) {}
}

export type ArticleActions =
  TryFetchArticles |
  FetchArticles |
  TryFetchArticle |
  FetchArticle |
  TryFetchMyArticles |
  FetchMyArticles |
  TryFetchArticleEdit |
  FetchArticleEdit |
  UpdateArticle |
  SaveArticle |
  DeleteArticle;
