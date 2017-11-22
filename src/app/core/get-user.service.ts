
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

export class GetUserService {
  firebaseUser: any;
  user = new Subject<any>();

  cleanUser() {
    this.firebaseUser = null;
    return this.user.next(this.firebaseUser);
  }

  getUser() {
    this.firebaseUser = firebase.auth().currentUser;
    if (this.firebaseUser != null) {
      return this.user.next(this.firebaseUser);
    } else {
      this.firebaseUser = null;
      return this.user.next(this.firebaseUser);
    }
  }
}
