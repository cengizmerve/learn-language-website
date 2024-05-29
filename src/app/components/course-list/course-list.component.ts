import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CourseService } from "../../services/course.service";
import { CourseInformationModel } from "../../models/course-information.model";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: CourseInformationModel[] | undefined;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: CourseInformationModel[]) => {
      this.courses = data;
    }, error => {
      console.log('error occurred while fetching courses list', error)
    });
  }

  viewCourseDetails(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }
}

