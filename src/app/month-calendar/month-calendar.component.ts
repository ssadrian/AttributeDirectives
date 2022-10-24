import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.css']
})
export class MonthCalendarComponent {
  @Input()
  month?: number;

  constructor() {
    console.log(this.month);
  }
}
