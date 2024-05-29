import { Component, OnInit } from '@angular/core';
import {UserProgress} from "../../models/user-progress.model";
import {UserService} from "../../services/user.service";
import {ThemePalette} from "@angular/material/core";
import {ProgressBarMode} from "@angular/material/progress-bar";

@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss']
})
export class UserProgressComponent implements OnInit {
  userProgressList: UserProgress[] | undefined;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserProgress();
  }

  getUserProgress(): void {
    this.userService.getUserProgress().subscribe((progress: UserProgress[] | undefined) => {
      this.userProgressList = progress;
    }, error => {
      console.log('error occurred while fetching user progress', error)
    });
  }
}

