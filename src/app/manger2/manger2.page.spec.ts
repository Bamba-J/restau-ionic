import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Manger2Page } from './manger2.page';

describe('Manger2Page', () => {
  let component: Manger2Page;
  let fixture: ComponentFixture<Manger2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Manger2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Manger2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
