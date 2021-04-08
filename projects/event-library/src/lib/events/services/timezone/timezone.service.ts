import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TimezoneCal {

  constructor() {
  }

  /**
   * For fing current location time
   * 
   * @param date event date
   * @param time event time
   * @returns location base date & time
   */
  calcTime(date, time) {
    // create Date object for current location
    let d = new Date(date + " " + time);
    let offset = d.getTimezoneOffset() / -60;
    //alert(date + ' - ' + time);
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (3600000 * offset));
  }

  /**
   * For get timezone code
   * @returns string (Eg : IST)
   */
  timeZoneAbbreviated = () => {
    const { 1: tz } = new Date().toString().match(/\((.+)\)/);

    if (tz.includes(" ")) {
      return tz
        .split(" ")
        .map(([first]) => first)
        .join("");
    } else {
      return tz;
    }
  };

  /**
   * To get time offset
   * @returns offset (eg +5.30 etc)
   */
  getTimeOffset() {
    let date = new Date();

    var sign = (date.getTimezoneOffset() > 0) ? "-" : "+";
    var offset = Math.abs(date.getTimezoneOffset());
    var hours = this.pad(Math.floor(offset / 60));
    var minutes = this.pad(offset % 60);

    return sign + hours + ":" + minutes;
  }

  pad(value) {
    return value < 10 ? '0' + value : value;
  }
}
