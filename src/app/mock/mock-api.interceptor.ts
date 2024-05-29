import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {MOCK_USER_PROGRESS} from "./mock-user-progress";
import {MOCK_COURSES} from "./mock-couses";

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/api/courses') && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: MOCK_COURSES })).pipe(delay(500));
    }

    if (req.url.endsWith('/api/user-progress') && req.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: MOCK_USER_PROGRESS })).pipe(delay(500));
    }

    const courseIdMatch = req.url.match(/\/api\/courses\/(\d+)$/);
    if (courseIdMatch && req.method === 'GET') {
      const courseId = parseInt(courseIdMatch[1], 10);
      const course = MOCK_COURSES.find(c => c.id === courseId);
      if (course) {
        return of(new HttpResponse({ status: 200, body: course })).pipe(delay(500));
      } else {
        return of(new HttpResponse({ status: 404 })).pipe(delay(500));
      }
    }

    return next.handle(req);
  }
}
