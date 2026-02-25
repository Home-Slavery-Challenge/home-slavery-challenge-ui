import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBoardingComponent } from './home-boarding.component';

describe('HomeBoardingComponent', () => {
  let component: HomeBoardingComponent;
  let fixture: ComponentFixture<HomeBoardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBoardingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
