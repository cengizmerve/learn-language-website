import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from "../../../services/course.service";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  courseId: number | undefined;
  course: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.getCourseDetails(this.courseId);
    });
  }

  getCourseDetails(courseId: number | undefined): void {
    this.courseService.getCourseById(courseId)
      .subscribe(res => {
        this.course = res;
      }, error => {
        console.log('error occurred while fetching course detail')
      });
  }

  enrollInCourse(): void {
    this.courseService.enrollCourse(this.courseId)
      .subscribe(
        () => this.router.navigate(['/user-progress']),
       error => console.error('Course registration error', error)
  );
  }
}
