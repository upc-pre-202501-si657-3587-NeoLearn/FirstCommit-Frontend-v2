import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheFooter } from './the-footer';

describe('TheFooter', () => {
  let component: TheFooter;
  let fixture: ComponentFixture<TheFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
