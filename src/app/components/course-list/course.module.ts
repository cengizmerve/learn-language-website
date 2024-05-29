// course.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from "./course-detail/course-detail.component";
import { CourseListComponent } from "./course-list.component";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  { path: '', component: CourseListComponent },
  { path: ':id', component: CourseDetailComponent }
];

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ]
})
export class CourseModule { }
