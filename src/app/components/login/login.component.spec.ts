import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { RegisterService } from '../../services/register.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let registerService: RegisterService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        {
          provide: RegisterService,
          useValue: {
            login: jasmine.createSpy('login').and.returnValue(of({}))
          }
        },
        {
          provide: AuthService,
          useValue: {
            login: jasmine.createSpy('login')
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    registerService = TestBed.inject(RegisterService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with empty values', () => {
    const loginForm = component.loginForm;
    expect(loginForm.get('email')?.value).toBe('');
    expect(loginForm.get('password')?.value).toBe('');
  });

  it('should call registerService.login and authService.login on form submit', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123'
    });

    const navigateSpy = spyOn(router, 'navigate');

    component.onSubmit();

    expect(registerService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(authService.login).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/courses']);
  });

  it('should handle login error', () => {
    (registerService.login as jasmine.Spy).and.returnValue(throwError('Giriş hatası'));
    spyOn(console, 'error');

    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('Giriş hatası:', 'Giriş hatası');
  });

  it('should toggle hide property when clickEvent is called', () => {
    expect(component.hide).toBe(true);
    component.clickEvent(new MouseEvent('click'));
    expect(component.hide).toBe(false);
    component.clickEvent(new MouseEvent('click'));
    expect(component.hide).toBe(true);
  });
});
