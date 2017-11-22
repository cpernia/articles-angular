import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthActions from './store/auth.actions';
import { ErrorService } from '../error.service';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  mode: string;

  constructor(private router: Router,
              private store: Store<AppState>,
              private errorService: ErrorService) { }

  ngOnInit() {

    this.store.select('auth')
      .subscribe( (data) => {
        if (data.error !== '' && data.error) {
          console.log('entering');
          this.errorService.toggleError(true);
        }
      });

    if (this.router.url.includes('signup')) {
      this.mode = 'Sign Up';
    } else {
      this.mode = 'Sign In';
    }
  }

  hideError() {
    if (this.errorService.showError) {
      this.errorService.toggleError(false);
    }
  }

  formSubmit(signForm: NgForm) {
    const email = signForm.value.email;
    const password = signForm.value.password;
    if (this.mode === 'Sign Up') {
      this.store.dispatch(new AuthActions.TrySignup({ username: email, password: password}));
    } else {
      this.store.dispatch(new AuthActions.TrySignin({ username: email, password: password}));
    }
  }

}
