import {Component} from '@angular/core';
import { AuthService} from "../../auth.service";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  constructor(public authService: AuthService) { }

}
