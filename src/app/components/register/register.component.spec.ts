import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerService: RegisterService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        {
          provide: RegisterService,
          useValue: {
            register: jasmine.createSpy('register').and.returnValue(of({}))
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerService = TestBed.inject(RegisterService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registerForm with empty values', () => {
    const registerForm = component.registerForm;
    expect(registerForm.get('email')?.value).toBe('');
    expect(registerForm.get('password')?.value).toBe('');
  });

  it('should call registerService.register and navigate to login on form submit', () => {
    component.registerForm.setValue({
      email: 'test@example.com',
      password: 'password123'
    });

    const navigateSpy = spyOn(router, 'navigate');

    component.onSubmit();

    expect(registerService.register).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should handle registration error', () => {
    (registerService.register as jasmine.Spy).and.returnValue(throwError('registration error'));
    spyOn(console, 'error');

    component.registerForm.setValue({
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('registration error:', 'registration error');
  });

  it('should toggle hide property when clickEvent is called', () => {
    expect(component.hide).toBe(true);
    component.clickEvent(new MouseEvent('click'));
    expect(component.hide).toBe(false);
    component.clickEvent(new MouseEvent('click'));
    expect(component.hide).toBe(true);
  });
});
