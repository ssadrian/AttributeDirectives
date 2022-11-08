import {Component} from "@angular/core";

interface IHoliday {
  date: Date;
  type: IHolidayType;
}

interface IHolidayType {
  name: HolidayType;
  color?: string;
}

interface IDayOfMonth {
  numeric: number;
  name: string;
  holiday?: IHoliday;
}

enum HolidayType {
  National = "National",
  Regional = "Regional",
  Local = "Local",
  Centre = "Centre"
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title: string = "AttributeDirectives";
  locale: string;

  monthsToShow: number[];
  typesOfHolidays: IHolidayType[];

  holidays: IHoliday[];

  currentYear: number;
  weekDays: string[];

  constructor() {
    this.weekDays = this.#getWeekDays();
    this.currentYear = new Date().getFullYear();

    this.locale = JSON.parse(`"es"`);
    this.monthsToShow = JSON.parse("[8, 9]");

    this.holidays = JSON.parse(`[
      { "date": "2022-09-10T22:00:00.000Z", "type": { "name": "Regional" } },
      { "date": "2022-09-28T22:00:00.000Z", "type": { "name": "Local" } },
      { "date": "2022-10-11T22:00:00.000Z", "type": { "name": "National" } },
      { "date": "2022-10-30T23:00:00.000Z", "type": { "name": "Centre" } }
    ]`);

    this.typesOfHolidays = JSON.parse(`[
      { "name": "National", "color": "#3fde70" },
      { "name": "Regional", "color": "#6967cf" },
      { "name": "Local", "color": "#d8279c" },
      { "name": "Centre", "color": "#c8dc57" }
    ]`);
  }

  getCalendarElements(year: number, month: number): (IDayOfMonth | undefined)[] {
    let firstDayOfWee: string = this.weekDays[0];

    let calendarDays: IDayOfMonth[] = this.daysInYearMonth(year, month);
    let firstEmptyDaysCount: number = this
      .getDifferenceBetweenDays(firstDayOfWee, calendarDays[0].name);

    return new Array(firstEmptyDaysCount)
      .concat(calendarDays);
  }

  monthToText(month: number): string {
    return this.#toTitleCase(
      Intl.DateTimeFormat(this.locale, { month: "long" })
        .format(new Date(2022, month)));
  }

  getDifferenceBetweenDays(comparisonDay: string, comparerDay: string): number {
    let comparisonDayIndex: number = this.weekDays.indexOf(comparisonDay);
    let comparerDayIndex: number = this.weekDays.indexOf(comparerDay);

    return Math.abs(comparisonDayIndex - comparerDayIndex);
  }

  daysInYearMonth(year: number, month: number): IDayOfMonth[] {
    let totalDays: number = new Date(year, month + 1, 0).getDate();
    let daysOfMonth: IDayOfMonth[] = [];

    for (let i: number = 1; i <= totalDays; i++) {
      let targetDate: Date = new Date(year, month, i);

      let dayName: string = Intl.DateTimeFormat(this.locale, { weekday: "short" })
        .format(targetDate);

      let matchedHoliday: IHoliday | undefined = this.holidays
        .find((x: IHoliday): boolean => new Date(x.date).getTime() - targetDate.getTime() === 0);

      let dayOfMonth: IDayOfMonth = { numeric: i, name: dayName, holiday: matchedHoliday };
      daysOfMonth.push(dayOfMonth);
    }

    return daysOfMonth;
  }

  getHolidayTypeName(holidayType?: IHolidayType | HolidayType): string | boolean {
    if (holidayType === undefined || holidayType === null) {
      return false;
    }

    let holidayTypeName: string = HolidayType[(<IHolidayType>holidayType).name];

    if (holidayTypeName === undefined) {
      holidayTypeName = HolidayType[(<HolidayType>holidayType)];
    }

    return holidayTypeName.toLowerCase();
  }

  #getWeekDays(): string[] {
    let baseDate: Date = new Date(0, 0, 1);
    let weekDays: string[] = [];

    for (let i: number = 0; i < 7; i++) {
      weekDays.push(baseDate.toLocaleDateString(this.locale, { weekday: "short" }));
      baseDate.setDate(baseDate.getDate() + 1);
    }

    return weekDays;
  }

  #toTitleCase(str: string): string {
    return str.replace(
      /\w\S*/g,
      (txt: string) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      }
    );
  }
}
