import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcitvityComponent } from './user-acitvity.component';

describe('UserAcitvityComponent', () => {
  let component: UserAcitvityComponent;
  let fixture: ComponentFixture<UserAcitvityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAcitvityComponent]
    });
    fixture = TestBed.createComponent(UserAcitvityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
