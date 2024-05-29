import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CourseInformationModel} from "../models/course-information.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'https://your-backend-url/api/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<CourseInformationModel[]> {
    return this.http.get<CourseInformationModel[]>(this.apiUrl);
  }

  getCourseById(id: number | undefined): Observable<CourseInformationModel> {
    return this.http.get<CourseInformationModel>(`${this.apiUrl}/${id}`);
  }

  enrollCourse(courseId: number | undefined): Observable<any> {
    return of({});
  }
}
