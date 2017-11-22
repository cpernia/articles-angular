import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideBarService } from '../side-bar.service';
import { Subscription } from 'rxjs/Subscription';
import {
  trigger,
  group,
  style,
  animate,
  transition,
  query
} from '@angular/animations';
import { GetUserService } from '../get-user.service';

@Component({
  selector: 'app-home',
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        query(':enter', style({ transform: 'translateX(100%)'}), {optional: true}),
        query(':enter, :leave', style({ paddingTop: '30px', position: 'absolute', top: 0, lef: 0, bottom: 0, right: 0}), {optional: true}),
        group([
          query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(-100%)'}))], {optional: true}),
          query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'translateX(0%)', padding: '30px'}))], {optional: true})
        ])
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  showCover = false;
  subscription: Subscription;
  user: any;
  titleSubscription: Subscription;

  constructor(private sideBarService: SideBarService,
              private getUserService: GetUserService) {
    this.subscription = this.sideBarService.openSideBar.subscribe(
      (data: boolean) => {
        this.showCover = data;
      }
    );
  }

  ngOnInit() {
    this.getUserService.getUser();
  }

  hideSideBar() {
    this.sideBarService.changeSideBarStatus();
  }

  getDepth(outlet) {
    return outlet.activatedRoute.snapshot.data.depth;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
