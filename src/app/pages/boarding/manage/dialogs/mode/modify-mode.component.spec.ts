import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyModeComponent } from './modify-mode.component';

describe('ModifyModeComponent', () => {
  let component: ModifyModeComponent;
  let fixture: ComponentFixture<ModifyModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyModeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
