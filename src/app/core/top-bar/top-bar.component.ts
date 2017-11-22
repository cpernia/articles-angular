import { Component, OnInit } from '@angular/core';
import { SideBarService } from '../side-bar.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import { GetUserService } from '../get-user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  authenticated = false;

  constructor(private sideBarService: SideBarService,
              private store: Store<AppState>,
              private userService: GetUserService) { }

  ngOnInit() {
    this.store.select('auth')
      .subscribe(
        (data) => {
          if (data.authenticated) {
            this.authenticated = true;
          } else {
            this.authenticated = false;
            this.userService.cleanUser();
          }
        }
      );
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  openSideBar() {
    this.sideBarService.changeSideBarStatus();
  }

}
