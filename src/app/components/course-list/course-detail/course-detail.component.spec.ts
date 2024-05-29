import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDetailComponent } from './course-detail.component';
import {ActivatedRoute, Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from "../../../services/course.service";
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('CourseDetailComponent', () => {
  let component: CourseDetailComponent;
  let fixture: ComponentFixture<CourseDetailComponent>;
  let courseService: CourseService;

  const mockCourse =     {
        id: 1,
        title: 'İngilizce Başlangıç',
        description: 'Temel İngilizce Kursu',
        instructor: 'Ahmet Yılmaz',
        content: 'Kurs içeriği...',
        duration: '4 weeks',
        difficulty: 'Beginner'
      }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: CourseService,
          useValue: {
            getCourseById: jasmine.createSpy('getCourseById').and.returnValue(of(mockCourse)),
            enrollCourse: jasmine.createSpy('enrollCourse').and.returnValue(of({}))
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch course details on init', () => {
    expect(courseService.getCourseById).toHaveBeenCalledWith(1);
    expect(component.course).toEqual(mockCourse);
  });

  it('should display course details', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    const descriptionElement = fixture.debugElement.query(By.css('.course-details span:first-child')).nativeElement;

    expect(titleElement.textContent).toContain('Course Title');
    expect(descriptionElement.textContent).toContain('Course Description');
  });

  it('should navigate to user progress on enroll', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.enrollInCourse();
    expect(courseService.enrollCourse).toHaveBeenCalledWith(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/user-progress']);
  });

  it('should handle error when fetching course details', () => {
    (courseService.getCourseById as jasmine.Spy).and.returnValue(throwError('error'));
    component.getCourseDetails(1);
    fixture.detectChanges();
    expect(component.course).toBeUndefined();
  });

  it('should handle error when enrolling in course', () => {
    (courseService.enrollCourse as jasmine.Spy).and.returnValue(throwError('error'));
    spyOn(console, 'error');
    component.enrollInCourse();
    expect(console.error).toHaveBeenCalledWith('Course registration error', 'error');
  });
});
