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
  National,
  Regional,
  Local,
  Centre
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
  typesOfHolidays: IHolidayType[] = [
    { name: HolidayType.National, color: "#3fde70" },
    { name: HolidayType.Regional, color: "#6967cf" },
    { name: HolidayType.Local, color: "#d8279c" },
    { name: HolidayType.Centre, color: "#c8dc57" }
  ];

  holidays: IHoliday[] = [
    { date: new Date(2022, 8, 11), type: { name: HolidayType.Regional } },
    { date: new Date(2022, 8, 29), type: { name: HolidayType.Local } },
    { date: new Date(2022, 9, 12), type: { name: HolidayType.National } },
    { date: new Date(2022, 8, 31), type: { name: HolidayType.Centre } }
  ];

  currentYear: number;
  weekDays: string[] = [];

  constructor() {
    this.weekDays = this.#getWeekDays();
    this.currentYear = new Date().getFullYear();
  }

  getCalendarElements(year: number, month: number): (IDayOfMonth | undefined)[] {
    let someMonday: string = this.weekDays[0];

    let calendarDays: IDayOfMonth[] = this.daysInYearMonth(year, month);
    let firstEmptyDaysCount: number = this.getDifferenceBetweenDays(someMonday, calendarDays[0].name);
    let remainingEmptyDaysCount: number = 7 * 5;

    return new Array(firstEmptyDaysCount)
      .concat(calendarDays)
      .concat(new Array(remainingEmptyDaysCount));
  }

  monthToText(month: number): string {
    return this.#toTitleCase(
      Intl.DateTimeFormat(this.locale, { month: "long" })
        .format(new Date(2022, month)));
  }

  getDifferenceBetweenDays(comparisonDay: string, comparerDay: string): number {
    let comparisonDayIndex: number = this.weekDays.indexOf(comparisonDay);
    let comparerDayIndex: number = this.weekDays.indexOf(comparerDay);

    console.log(Math.abs(comparisonDayIndex - comparerDayIndex));
    return Math.abs(comparisonDayIndex - comparerDayIndex);
  }

  daysInYearMonth(year: number, month: number): IDayOfMonth[] {
    let totalDays: number = new Date(year, month + 1, 0).getDate();
    let daysOfMonth: IDayOfMonth[] = [];

    for (let i = 1; i <= totalDays; i++) {
      let targetDate: Date = new Date(year, month, i);

      let dayName: string = Intl.DateTimeFormat(this.locale, { weekday: "narrow" })
        .format(targetDate);

      let holiday: IHoliday | undefined = this.holidays.find(x => x.date == targetDate);

      let dayOfMonth: IDayOfMonth = { numeric: i, name: dayName, holiday: holiday };
      daysOfMonth.push(dayOfMonth);
    }

    return daysOfMonth;
  }

  getHolyDayTypeName(holidayType: IHolidayType | HolidayType): string {
    switch (<IHolidayType>holidayType) {
      case undefined:
        return HolidayType[(<IHolidayType>holidayType).name];

      default:
        return HolidayType[(<HolidayType>holidayType)];
    }
  }

  #getWeekDays(): string[] {
    // Passed date is not important
    let baseDate: Date = new Date(0, 0, 1);
    let weekDays: string[] = [];

    for (let i: number = 0; i < 7; i++) {
      weekDays.push(baseDate.toLocaleDateString(this.locale, { weekday: "narrow" }));
      baseDate.setDate(baseDate.getDate() + 1);
    }

    return weekDays;
  }

  #toTitleCase(str: string): string {
    return str.replace(
      /\w\S*/g,
      (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      }
    );
  }
}