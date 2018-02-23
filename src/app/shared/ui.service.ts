import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class UiService {

  constructor(private matSnackBar: MatSnackBar) { }

  showSnackBar(msg, action, duration) {
    this.matSnackBar.open(msg, action, { duration: duration});
  }
}
