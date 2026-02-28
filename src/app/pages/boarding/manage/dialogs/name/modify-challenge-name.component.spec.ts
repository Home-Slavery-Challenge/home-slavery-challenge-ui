import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyChallengeNameComponent } from './modify-challenge-name.component';

describe('ModifyChallengeNameComponent', () => {
  let component: ModifyChallengeNameComponent;
  let fixture: ComponentFixture<ModifyChallengeNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyChallengeNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyChallengeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
