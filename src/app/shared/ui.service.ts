import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class UiService {
  spinnerRunning = new Subject<boolean>();
  constructor(private matSnackBar: MatSnackBar) { }

  showSnackBar(msg, action, duration) {
    this.matSnackBar.open(msg, action, { duration: duration});
  }

  startSpinner() {
    this.spinnerRunning.next(true);
  }

  stopSpinner() {
    this.spinnerRunning.next(false);
  }
}
