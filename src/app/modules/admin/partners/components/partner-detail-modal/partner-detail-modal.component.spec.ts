import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDetailModalComponent } from './partner-detail-modal.component';

describe('PartnerDetailModalComponent', () => {
  let component: PartnerDetailModalComponent;
  let fixture: ComponentFixture<PartnerDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
