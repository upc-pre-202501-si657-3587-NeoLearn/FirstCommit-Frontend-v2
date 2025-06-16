import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ProjectsPageComponent } from './projects-page.component';
import { ProjectService } from '../../services/project.service';

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let fixture: ComponentFixture<ProjectsPageComponent>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectService', ['getProjects', 'createProject']);
    mockProjectService.getProjects.and.returnValue(of([]));
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ProjectsPageComponent, HttpClientTestingModule],
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
        { provide: MatDialog, useValue: mockMatDialog },
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
