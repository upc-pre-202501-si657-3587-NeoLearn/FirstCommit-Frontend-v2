import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapComponente } from './roadmap-componente';

describe('RoadmapComponente', () => {
  let component: RoadmapComponente;
  let fixture: ComponentFixture<RoadmapComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadmapComponente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapComponente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
