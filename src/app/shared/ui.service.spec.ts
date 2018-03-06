import { MatSnackBar } from '@angular/material/snack-bar';
import { TestBed, inject } from '@angular/core/testing';

import { UiService } from './ui.service';

xdescribe('UiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiService, MatSnackBar]
    });
  });

  it('should be created', inject([UiService], (service: UiService) => {
    expect(service).toBeTruthy();
  }));
});
