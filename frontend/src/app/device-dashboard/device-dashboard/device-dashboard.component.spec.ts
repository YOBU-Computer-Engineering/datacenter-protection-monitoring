import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDashboardComponent } from './device-dashboard.component';

describe('DeviceDashboardComponent', () => {
  let component: DeviceDashboardComponent;
  let fixture: ComponentFixture<DeviceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
