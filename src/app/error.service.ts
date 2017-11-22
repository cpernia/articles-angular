
import { Subject } from 'rxjs/Subject';

export class ErrorService {
  error = new Subject<boolean>();
  showError = false;

  toggleError(showError: boolean) {
    this.showError = showError;
    return this.error.next(this.showError);
  }
}
