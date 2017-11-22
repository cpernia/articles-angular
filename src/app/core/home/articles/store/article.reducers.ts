import * as ArticleActions from './article.actions';
import { Article } from '../article.model';

export interface ArticlesState {
  articles: Article[];
  articleViewed: Article;
  myArticles: Article[];
  articleToEdit: Article;
}

const initialState: ArticlesState = {
  articles: [],
  articleViewed: null,
  myArticles: [],
  articleToEdit: null
};

export function articlesReducer(state = initialState, action: ArticleActions.ArticleActions) {
  switch (action.type) {
    case (ArticleActions.FETCH_ARTICLES):
      console.log('fetch articles reducer');
      return {
        ...state,
        articles: action.payload
      };
    case (ArticleActions.FETCH_ARTICLE):
      console.log('fetch articleViewed reducer');
      return {
        ...state,
        articleViewed: action.payload
      };
    case (ArticleActions.FETCH_MY_ARTICLES):
      console.log('fetch myArticles reducer');
      return {
        ...state,
        myArticles: action.payload
      };
    case (ArticleActions.FETCH_ARTICLE_EDIT):
      console.log('fetch articleToEdit reducer');
      return {
        ...state,
        articleToEdit: action.payload
      };
    default:
      return state;
  }
}
