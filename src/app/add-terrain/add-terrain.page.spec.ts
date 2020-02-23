import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerrainPage } from './add-terrain.page';

describe('AddTerrainPage', () => {
  let component: AddTerrainPage;
  let fixture: ComponentFixture<AddTerrainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTerrainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTerrainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
