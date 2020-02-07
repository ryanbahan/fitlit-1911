class Calculator {
  constructor(id) {
    this.currentDataId = id;
  }

  getUserDayTotal(category, date, metric) {
    return category.find(day => day.date === date && day.userID === this.currentDataId)[metric];
  }

  getUserAllTimeAvg(category, metric) {
    return category.reduce((average, items) => {
      average += items[metric] / category.length;
      return Math.round(average * 100) / 100;
    }, 0);
  }

  getUserWeekTotal(category, date, metric) {
    let beginWeekDay = this.modifyDate(this.stringToDate(date), -6);
    const endWeekDay = this.stringToDate(date);
    const week = [];
    const metricData = [];

    while (beginWeekDay <= endWeekDay) {
      week.push(beginWeekDay);
      beginWeekDay = this.modifyDate(beginWeekDay, 1);
    }

    week.forEach(day => {
      const currentDay = this.dateToString(day);
      metricData.push(this.getUserDayTotal(category, currentDay, metric));
    });

    const weekData = { dates: week, metrics: metricData }

    return weekData;
  }

  stepsToMiles(state, date) {
    const MILE = 5280;
    const userSteps = this.getUserDayTotal(
      state.currentUserData.activityData,
      date,
      "numSteps"
    );
    const userStrideLength = state.currentUser.strideLength;
    const userDistance = userSteps * userStrideLength;
    const userMiles = Math.round((userDistance / MILE) * 100) / 100;
    return userMiles;
  }

  stringToDate(string) {
    // This makes three variables corresponding to the array returned by string.split('/') using array destructuring and then instantiates and returns a new date object.
    const [year, month, day] = string.split("/");
    return new Date(year, month - 1, day);
  }

  dateToString(date) {
    // This method converts a date object to a string for use in getUserWeekTotal() method. That method requires a string date.
    const year = date.getFullYear();
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;

    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }

    return [year, month, day].join("/");
  }

  modifyDate(date, days) {
    // This method creates a new date that is in the future or past based on number of days passed to its days parameter and returns the new date as a copy. Does not mutate the argument.
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  getWeekDay(date) {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ][date.getDay()];
  }
}

if (typeof module !== "undefined") {
  module.exports = Calculator;
}
