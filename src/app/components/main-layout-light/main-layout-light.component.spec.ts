import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutLightComponent } from './main-layout-light.component';

describe('MainLayoutLightComponent', () => {
  let component: MainLayoutLightComponent;
  let fixture: ComponentFixture<MainLayoutLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutLightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
