import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerResereverPage } from './per-reserever.page';

describe('PerResereverPage', () => {
  let component: PerResereverPage;
  let fixture: ComponentFixture<PerResereverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerResereverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerResereverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
