import { Subject } from 'rxjs/Subject';

export class SideBarService {
  openSideBar = new Subject<boolean>();
  opened = false;

  changeSideBarStatus() {
    this.opened = !this.opened;
    return this.openSideBar.next(this.opened);
  }
}
