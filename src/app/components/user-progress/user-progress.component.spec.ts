import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProgressComponent } from './user-progress.component';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';
import { UserProgress } from '../../models/user-progress.model';

describe('UserProgressComponent', () => {
  let component: UserProgressComponent;
  let fixture: ComponentFixture<UserProgressComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProgressComponent],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProgressComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user progress on init', () => {
    const userProgress: UserProgress[] = [
      { id: 1,
        userId: 1,
        courseId: 1,
        courseName: 'İngilizce Başlangıç',
        completedLessons: 3,
        completedQuizzes: 1,
        totalLessons: 10,
        totalQuizzes:10
      },
      { id: 2,
        userId: 1,
        courseId: 2,
        courseName: 'Almanca Orta Seviye',
        completedLessons: 2,
        completedQuizzes: 0,
        totalLessons: 10,
        totalQuizzes:10
      },
    ];

    spyOn(userService, 'getUserProgress').and.returnValue(of(userProgress));

    component.ngOnInit();

    expect(userService.getUserProgress).toHaveBeenCalled();
    expect(component.userProgressList).toEqual(userProgress);
  });

  it('should handle error when fetching user progress', () => {
    spyOn(userService, 'getUserProgress').and.returnValue(throwError('error'));

    spyOn(console, 'log');

    component.ngOnInit();

    expect(console.log).toHaveBeenCalledWith('error occurred while fetching user progress', 'error');
    expect(component.userProgressList).toBeUndefined();
  });
});
