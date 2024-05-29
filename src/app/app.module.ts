import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CourseListComponent} from "./components/course-list/course-list.component";
import {CourseDetailComponent} from "./components/course-list/course-detail/course-detail.component";
import {CourseService} from "./services/course.service";
import {MockApiInterceptor} from "./mock/mock-api.interceptor";
import {RegisterComponent} from "./components/register/register.component";
import { LoginComponent } from './components/login/login.component';
import {RegisterService} from "./services/register.service";
import { UserProgressComponent } from './components/user-progress/user-progress.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import {MatMenuModule} from "@angular/material/menu";
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserProgressComponent,
    MenuBarComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatMenuModule,
        MatProgressBarModule,
        FlexLayoutModule,
        MatProgressSpinnerModule
    ],
  providers: [
    CourseService,
    RegisterService,
    AuthGuard, AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
