import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRewardsComponent } from './modify-rewards.component';

describe('ModifyRewardsComponent', () => {
  let component: ModifyRewardsComponent;
  let fixture: ComponentFixture<ModifyRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyRewardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
