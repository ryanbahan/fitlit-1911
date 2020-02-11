class Database {
  constructor(hydrationData, activityData, sleepData) {
    this.hydrationData = hydrationData;
    this.activityData = activityData;
    this.sleepData = sleepData;
  }

  filterUser(userId) {
    const userData = {
      hydrationData: null,
      activityData: null,
      sleepData: null
    };

    for (const property in this) {
      const dataset = this[property];
      const userDataInstance = dataset.filter(data => data.userID === userId);
      userData[property] = userDataInstance;
    }

    return userData;
  }

  filterByMetric(category, metric, date, Calculator) {
    const filteredPeople = [];
    const people = this[category].reduce((people, person) => {
      if (person.userID !== people.find(id => id === person.userID)) {
        people.push(person.userID);
      }
      return people;
    }, []);

    people.forEach(id => {
      const calculator = new Calculator(id);
      const weekData = calculator.getUserWeekTotal(this[category], date, metric);
      weekData.id = id;

      weekData.metrics = weekData.metrics.reduce((a, b) => {
        a += b;
        a = a / people.length;
        return a;
      }, 0);

      weekData.metrics = weekData.metrics.toFixed(1);
      weekData.metrics = parseFloat(weekData.metrics);

      weekData.metrics >= 3 && filteredPeople.push(weekData.id);
    })

    return filteredPeople;
  };

  getUserLeaderByCategory(category, date, metric) {
    let returnValue = [];
    let leaderboard = this[category].sort((a, b) => b[metric] - a[metric]);
    let highestValue = leaderboard[0][metric];

    leaderboard = leaderboard.filter(user => user[metric] === highestValue);
    leaderboard = leaderboard.map(item => {
      let newItem = {};
      newItem.id = item.userID;
      newItem[metric] = item[metric];
      return newItem;
    })

    leaderboard.forEach(item => {
      if (!returnValue.find(value => item.id === value.id)) {
        returnValue.push(item);
      }
    })

    return returnValue;
  }

  getCurrentDay(currentUserData) {
    return currentUserData.hydrationData[
      currentUserData.hydrationData.length - 1
    ].date;
  }
}

if (typeof module !== "undefined") {
  module.exports = Database;
}
