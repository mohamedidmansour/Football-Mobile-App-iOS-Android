import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerInterestedPage } from './per-interested.page';

describe('PerInterestedPage', () => {
  let component: PerInterestedPage;
  let fixture: ComponentFixture<PerInterestedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerInterestedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerInterestedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
