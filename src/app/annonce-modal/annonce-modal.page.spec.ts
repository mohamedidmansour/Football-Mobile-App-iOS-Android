import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceModalPage } from './annonce-modal.page';

describe('AnnonceModalPage', () => {
  let component: AnnonceModalPage;
  let fixture: ComponentFixture<AnnonceModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
