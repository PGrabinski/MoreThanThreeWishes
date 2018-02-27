import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListIndexComponent } from './wish-list-index.component';

describe('WishListIndexComponent', () => {
  let component: WishListIndexComponent;
  let fixture: ComponentFixture<WishListIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
