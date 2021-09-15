import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestosPage } from './restos.page';

describe('RestosPage', () => {
  let component: RestosPage;
  let fixture: ComponentFixture<RestosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
