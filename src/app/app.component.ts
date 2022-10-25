import {Component} from "@angular/core";

interface HolidayType {
  name: string;
  color: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title: string = "AttributeDirectives";
  locale: string = "es";

  monthsToShow: number[] = [8, 9];
  typesOfHolidays: HolidayType[] = [
    {name: "National", color: "#3fde70"},
    {name: "Regional", color: "#6967cf"},
    {name: "Local", color: "#d8279c"},
    {name: "Centre", color: "#c8dc57"}
  ];

  currentYear: number;
  weekDays: string[] = [];

  constructor() {
    this.weekDays = this.#getWeekDays();
    this.currentYear = new Date().getFullYear();
  }

  monthToText(month: number): string {
    return this.#toTitleCase(
      Intl.DateTimeFormat(this.locale, {month: "long"})
        .format(new Date(2022, month)));
  }

  daysInYearMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  #getWeekDays() {
    // Passed date is not important
    let baseDate: Date = new Date(0, 0, 1);
    let weekDays: string[] = [];

    for (let i: number = 0; i < 7; i++) {
      weekDays.push(baseDate.toLocaleDateString(this.locale, {weekday: "narrow"}));
      baseDate.setDate(baseDate.getDate() + 1);
    }

    return weekDays;
  }

  #toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      }
    );
  }
}
