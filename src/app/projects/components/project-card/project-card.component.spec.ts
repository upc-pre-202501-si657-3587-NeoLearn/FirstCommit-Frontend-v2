import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProjectCardComponent } from './project-card.component';
import { Project } from '../../models/project.model';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  const mockProject: Project = {
    id: 1, name: 'Mock Project', description: 'This is a mock description.',
    projectType: 'GROUP', ownerUserId: 101, license: null, sendbirdChannelId: 'mock_channel_1',
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [provideAnimationsAsync()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
