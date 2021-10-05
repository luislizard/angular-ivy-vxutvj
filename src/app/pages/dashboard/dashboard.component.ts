import { AppService } from '@services/app.service';
import {Component} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user;
  constructor(private appService: AppService){}

  ngOnInit(): void {
    this.user = this.appService.user;
  }

}
