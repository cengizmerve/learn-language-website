import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { CourseService } from "../../services/course.service";
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Router} from "@angular/router";

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let courseService: CourseService;
  let mockCourses = [
    {
      id: 1,
      title: 'İngilizce Başlangıç',
      description: 'Temel İngilizce Kursu',
      instructor: 'Ahmet Yılmaz',
      content: 'Kurs içeriği...',
      duration: '4 weeks',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Almanca Orta Seviye',
      description: 'Orta seviye Almanca Kursu',
      instructor: 'Mehmet Demir',
      content: 'Kurs içeriği...',
      duration: '6 weeks',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Fransızca İleri Seviye',
      description: 'İleri seviye Fransızca Kursu',
      instructor: 'Ayşe Kaya',
      content: 'Kurs içeriği...',
      duration: '8 weeks',
      difficulty: 'Advanced'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      imports: [RouterTestingModule, MatCardModule, MatDividerModule, HttpClientTestingModule],
      providers: [
        {
          provide: CourseService,
          useValue: {
            getCourses: jasmine.createSpy('getCourses').and.returnValue(of(mockCourses))
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCourses on init and set courses', () => {
    expect(courseService.getCourses).toHaveBeenCalled();
    expect(component.courses).toEqual(mockCourses);
  });

  it('should display courses', () => {
    const courseElements: DebugElement[] = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(courseElements.length).toBe(2);
    expect(courseElements[0].nativeElement.textContent).toContain('Course 1');
    expect(courseElements[1].nativeElement.textContent).toContain('Course 2');
  });

  it('should navigate to course details on course title click', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
    const courseTitleElement: DebugElement = fixture.debugElement.query(By.css('mat-card-title'));
    courseTitleElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(navigateSpy).toHaveBeenCalledWith(['/courses', 1]);
  });

  it('should handle error when fetching courses', () => {
    (courseService.getCourses as jasmine.Spy).and.returnValue(throwError('error'));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.courses).toBeUndefined();
  });
});
