import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedFriendsComponent } from './blocked-friends.component';

describe('BlockedFriendsComponent', () => {
  let component: BlockedFriendsComponent;
  let fixture: ComponentFixture<BlockedFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockedFriendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockedFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
