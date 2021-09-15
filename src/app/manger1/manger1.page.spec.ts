import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Manger1Page } from './manger1.page';

describe('Manger1Page', () => {
  let component: Manger1Page;
  let fixture: ComponentFixture<Manger1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Manger1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Manger1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
