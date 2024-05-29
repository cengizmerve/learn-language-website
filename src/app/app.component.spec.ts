import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subject } from 'rxjs';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";

class RouterStub {
  private subject = new Subject<any>();

  get events() {
    return this.subject.asObservable();
  }

  triggerEvent(event: any) {
    this.subject.next(event);
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: RouterStub;

  beforeEach(async () => {
    router = new RouterStub();

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: Router, useValue: router }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set loading to true on navigation start', () => {
    router.triggerEvent(new NavigationStart(1, '/'));
    expect(component.loading).toBeTruthy();
  });

  it('should set loading to false on navigation end', () => {
    router.triggerEvent(new NavigationEnd(1, '/', '/'));
    expect(component.loading).toBeFalsy();
  });

  it('should set loading to false on navigation cancel', () => {
    router.triggerEvent(new NavigationCancel(1, '/', '/'));
    expect(component.loading).toBeFalsy();
  });

  it('should set loading to false on navigation error', () => {
    router.triggerEvent(new NavigationError(1, '/', 'Error'));
    expect(component.loading).toBeFalsy();
  });
});
