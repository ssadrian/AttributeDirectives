import {Component} from '@angular/core';

interface HolidayType {
  name: string;
  color: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AttributeDirectives';

  monthsToShow: number[] = [9, 10];
  typesOfHolidays: HolidayType[] = [
    {name: "National", color: "green"},
    {name: "Regional", color: "purple"},
    {name: "Local", color: "pink"},
    {name: "Centre", color: "lime"}
  ];
}
