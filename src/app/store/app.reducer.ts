import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromArticles from '../core/home/articles/store/article.reducers';

export interface AppState {
  auth: fromAuth.AuthState;
  articles: fromArticles.ArticlesState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  articles: fromArticles.articlesReducer
};
