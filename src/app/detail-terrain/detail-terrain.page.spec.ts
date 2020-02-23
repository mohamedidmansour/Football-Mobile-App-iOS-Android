import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTerrainPage } from './detail-terrain.page';

describe('DetailTerrainPage', () => {
  let component: DetailTerrainPage;
  let fixture: ComponentFixture<DetailTerrainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTerrainPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTerrainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
