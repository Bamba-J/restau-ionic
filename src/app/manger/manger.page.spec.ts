import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerPage } from './manger.page';

describe('MangerPage', () => {
  let component: MangerPage;
  let fixture: ComponentFixture<MangerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
