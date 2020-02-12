class Calculator {
  constructor(id) {
    this.currentDataId = id;
    this.aScore = {grade: "A", score: 5};
    this.bScore = {grade: "B", score: 4};
    this.cScore = {grade: "C", score: 3};
    this.dScore = {grade: "D", score: 2};
    this.fScore = {grade: "F", score: 1};
  }

  getUserDayTotal(category, date, metric) {
    return category.find(
      day => day.date === date && day.userID === this.currentDataId
    )[metric];
  }

  getUserAllTimeAvg(category, metric, decimalPlacement = 100) {
    return category.reduce((average, items) => {
      average += items[metric] / category.length;
      return Math.round(average * decimalPlacement) / decimalPlacement;
    }, 0);
  }

  getUserAllTimeMax(category, metric) {
    const metricValues = category.map(date => {
      return date[metric];
    });

    return Math.max(...metricValues);
  }

  getAllUserAllTimeAvg(
    dataset,
    database,
    metric,
    date = null,
    decimalPlacement = 100
  ) {
    // Takes in a dataset string (e.g. 'sleepData', 'hydrationData', 'activityData'), database (i.e. it needs all the data, therefore the entire database is passed in), and a metric (e.g. 'hoursSlept') because it needs to search all users' data, not just the current user. If a date is passed in, will filter the database by date and average from that value.
    let dataToAverage = database[dataset];

    if (date) {
      dataToAverage = database[dataset].filter(datapoint => {
        return datapoint.date === date;
      });
    }

    const nonRoundedAvg =
      dataToAverage.reduce((average, datapoint) => {
        const avg = (average += datapoint[metric]);
        return avg;
      }, 0) / database[dataset].length;

    return Math.round(nonRoundedAvg * decimalPlacement) / decimalPlacement;
  }

  getAllAverages(database) {
    let averages = [];
    let categories = Object.keys(database);
    let metrics = [];

    categories.forEach(category => {
      let arr = [];
      let keys = Object.keys(database[category][0]);
      keys.forEach(key => {
        arr.push([category, key]);
      });
      metrics.push(arr);
    });

    metrics = metrics.flat();
    metrics = metrics.filter(
      metric => metric[1] !== "userID" && metric[1] !== "date"
    );

    metrics.forEach(metric => {
      let average = this.getAllUserAllTimeAvg(metric[0], database, metric[1]);

      averages.push([metric[1], average]);
    });

    return averages;
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

    const weekData = { dates: week, metrics: metricData };

    return weekData;
  }

  getTrend(category, metric, streakDays = 3) {
    let trends = [];
    let temp = [category[0]];

    for (let i = 0; i < category.length - 1; i++) {
      let isTrending = temp[temp.length - 1][metric] < category[i + 1][metric];

      if (isTrending) {
        temp.push(category[i + 1]);
      } else if (!isTrending && temp.length >= streakDays) {
        trends.push(temp);
        temp = [category[i + 1]];
      } else {
        temp = [category[i + 1]];
      }
    }

    const trendDates = trends.reduce((dates, currentTrend) => {
      let trendDates = currentTrend.map(trendDay => trendDay.date);
      dates.push(trendDates);
      return dates;
    }, []);

    return trendDates;
  }

  getPercentages(dataset) {
    const percentages = [];
    const max = Math.max(...dataset);
    dataset.forEach(datum => {
      percentages.push(Math.round((datum * 100) / max));
    });

    return percentages;
  }

  calculateTotal(data) {
    return data.metrics.reduce((a, b) => {
      a += b;
      return a;
    }, 0);
  }

  stepsToMiles(state, date, providedUserSteps = null, decimalPlacement = 100) {
    const MILE = 5280;
    let userSteps;

    if (providedUserSteps) {
      userSteps = providedUserSteps;
    } else {
      userSteps = this.getUserDayTotal(
        state.currentUserData.activityData,
        date,
        "numSteps"
      );
    }

    const userStrideLength = state.currentUser.strideLength;
    const userDistance = userSteps * userStrideLength;
    const userMiles =
      Math.round((userDistance / MILE) * decimalPlacement) / decimalPlacement;
    return userMiles;
  }

  stepGoalMet(state, date) {
    const stepGoal = state.currentUser.dailyStepGoal;
    const stepsOnDate = this.getUserDayTotal(
      state.currentUserData.activityData,
      date,
      "numSteps"
    );

    return stepsOnDate > stepGoal;
  }

  getDaysStepGoalMet(state) {
    return state.currentUserData.activityData
      .filter(day => {
        return this.stepGoalMet(state, day.date);
      })
      .map(dayGoalMet => {
        return dayGoalMet.date;
      });
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

  calculateStepsGrade(dS) {
    if(dS >= 12000){
      return this.aScore;
    } else if(9000 <= dS && dS < 12000) {
      return this.bScore;
    } else if(6500 <= dS && dS < 9000) {
      return this.cScore;
    } else if(4000 <= dS && dS < 6500) {
      return this.dScore;
    } else if(dS < 4000) {
      return this.fScore;
    }
  };

  calculateFlightsGrade(f) {
    if(35 < f && f < 51){
      return this.aScore;
    } else if(20 < f && f < 36) {
      return this.bScore;
    } else if(7 < f && f < 21) {
      return this.cScore;
    } else if(1 < f && f < 8) {
      return this.dScore;
    } else if(f < 2) {
      return this.fScore;
    }
  };

  calculateMinutesActiveGrade(mA) {
    if(mA > 200){
      return this.aScore;
    } else if(130 < mA && mA < 201) {
      return this.bScore;
    } else if(80 < mA && mA < 132) {
      return this.cScore;
    } else if(45 < mA && mA < 81) {
      return this.dScore;
    } else if(mA < 46) {
      return this.fScore;
    }
  };

  calculateSleepQualGrade(sQ) {
    if(sQ >= 4 ){
      return this.aScore;
    } else if(3 <= sQ && sQ <= 3.9) {
      return this.bScore;
    } else if(2 <= sQ && sQ <= 2.9) {
      return this.cScore;
    } else if(1.5 <= sQ && sQ <= 1.9) {
      return this.dScore;
    } else if(1 <= sQ && sQ <= 1.4) {
      return this.fScore;
    }
  };

  calculateSleepLengthGrade(sL) {
    if(sL >= 8 ){
      return this.aScore;
    } else if( 7 <= sL && sL < 8) {
      return this.bScore;
    } else if(6 <= sL && sL < 7) {
      return this.cScore;
    } else if(5 <= sL && sL < 6) {
      return this.dScore;
    } else if(sL < 5) {
      return this.fScore;
    }
  };

  calculateHydrationGrade(h) {
    if(h > 80){
      return this.aScore;
    } else if(65 < h && h < 81) {
      return this.bScore;
    } else if(50 < h && h < 66) {
      return this.cScore;
    } else if(35 < h && h < 51) {
      return this.dScore;
    } else if(h < 36) {
      return this.fScore;
    }
  };

  calculateOverallGrade(dailyGrades) {
    let score = (dailyGrades.stepsGrade.score +
    dailyGrades.flightsGrade.score +
    dailyGrades.minutesActiveGrade.score +
    dailyGrades.sleepQualGrade.score +
    dailyGrades.sleepLengthGrade.score +
    dailyGrades.hydrationGrade.score)/6
    if(score >= 1 && score < 2){return "F"}
    else if(score >= 2 && score < 3){return "D"}
    else if(score >= 3 && score < 4){return "C"}
    else if(score >= 4 && score < 4.5){return "B"}
    else if(score >= 4.5 && score < 5){return "A"}
  };
}

if (typeof module !== "undefined") {
  module.exports = Calculator;
}
