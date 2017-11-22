import { Component, OnInit, OnDestroy } from '@angular/core';
import { SideBarService } from '../side-bar.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit, OnDestroy {
  open = false;
  subscription: Subscription;

  constructor(private sideBarService: SideBarService) {

    this.subscription = this.sideBarService.openSideBar.subscribe(
      (data: boolean) => {
        this.open = data;
      }
    );
  }

  ngOnInit() {

  }

  closeMenu() {
    this.sideBarService.changeSideBarStatus();
  }

  ngOnDestroy()  {
    this.subscription.unsubscribe();
  }

}
