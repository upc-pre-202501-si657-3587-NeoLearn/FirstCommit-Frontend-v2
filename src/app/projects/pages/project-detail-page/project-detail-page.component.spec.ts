import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectDetailPageComponent } from './project-detail-page.component';

describe('ProjectDetailPageComponent', () => {
  let component: ProjectDetailPageComponent;
  let fixture: ComponentFixture<ProjectDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailPageComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]), // Proporcionar un mock para el enrutador
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '1']])) // Simular un parámetro de ruta con id=1
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
