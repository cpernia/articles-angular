
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import * as AuthActions from './auth.actions';


@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password))
        .catch(err => Observable.throw(err))
        .switchMap(() => {
          return fromPromise(firebase.auth().currentUser.getIdToken())
            .catch(err => Observable.throw(err))
            .mergeMap((token: string) => {
              return [
                {
                  type: AuthActions.SIGNUP
                },
                {
                  type: AuthActions.SET_TOKEN,
                  payload: token
                },
                {
                  type: AuthActions.REDIRECT,
                  payload: '/articles'
                }
              ];
            });
        })
        .catch(err => of(new AuthActions.Error({ error: err.message })));
    });

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
        return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
          .catch(err => Observable.throw(err))
          .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken())
              .catch(err => Observable.throw(err))
              .mergeMap((token: string) => {
                  return [
                    {
                      type: AuthActions.SIGNIN
                    },
                    {
                      type: AuthActions.SET_TOKEN,
                      payload: token
                    },
                    {
                      type: AuthActions.REDIRECT,
                      payload: '/articles'
                    }
                  ];
                });
          })
        .catch(err => of(new AuthActions.Error({ error: err.message })));
    });

  @Effect({dispatch: false})
  redirect = this.actions$
    .ofType(AuthActions.REDIRECT)
    .map((action: AuthActions.Redirect) => {
      return action.payload;
    })
    .do((url: string) => {
      return this.router.navigate([url]);
    });

  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do(() => {
      this.router.navigate(['/']);
    });

  @Effect({dispatch: false})
  error = this.actions$
    .ofType(AuthActions.ERROR)
    .map((action: AuthActions.Error) => {
      return action.payload;
    });

  constructor(private actions$: Actions, private router: Router
  ) {}
}
