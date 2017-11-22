import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs/Subscription';
import { ErrorService } from './error.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  errorSubscription: Subscription;
  titleSubscription: Subscription;
  showError: boolean;

  constructor(private errorService: ErrorService,
              private route: ActivatedRoute,
              private router: Router,
              private titleService: Title) {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBx-Kq9xhmarTXfCf0IozirHSNa-r8eBTI',
      authDomain: 'articles-aeaf0.firebaseapp.com',
      databaseURL: 'https://articles-aeaf0.firebaseio.com',
      projectId: 'articles-aeaf0',
      storageBucket: 'articles-aeaf0.appspot.com',
      messagingSenderId: '252978176491'
    });
    this.errorSubscription = this.errorService.error.subscribe(
      (showError: boolean) => {
        this.showError = showError;
      }
    );
    this.titleSubscription = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.route)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.data.title;
      })
      .subscribe((title) => this.titleService.setTitle(title));
  }
  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
    this.titleSubscription.unsubscribe();
  }
  hideError() {
    this.errorService.toggleError(false);
  }

}
