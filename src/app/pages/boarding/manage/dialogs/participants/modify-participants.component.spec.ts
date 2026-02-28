import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyParticipantsComponent } from './modify-participants.component';

describe('ModifyParticipantsComponent', () => {
  let component: ModifyParticipantsComponent;
  let fixture: ComponentFixture<ModifyParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyParticipantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
