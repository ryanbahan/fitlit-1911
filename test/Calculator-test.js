const chai = require("chai");
const { expect } = chai;
chai.use(require("chai-datetime"));
const Calculator = require("../src/classes/Calculator");
const Database = require("../src/classes/Database");
const userDataTest = require("../test-data/users-test");
const hydrationDataTest = require("../test-data/hydration-test");
const activityDataTest = require("../test-data/activity-test");
const sleepDataTest = require("../test-data/sleep-test");

const state = {
  currentUser: {
    id: 1,
    name: "Luisa Hane",
    address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    email: "Diana.Hayes1@hotmail.com",
    strideLength: 4.3,
    dailyStepGoal: 10000,
    friends: [2, 3, 4]
  },
  currentUserData: {
    hydrationData: [
      { userID: 1, date: "2019/06/15", numOunces: 37 },
      { userID: 1, date: "2019/06/16", numOunces: 75 },
      { userID: 1, date: "2019/06/17", numOunces: 47 },
      { userID: 1, date: "2019/06/18", numOunces: 85 },
      { userID: 1, date: "2019/06/19", numOunces: 42 },
      { userID: 1, date: "2019/06/20", numOunces: 87 },
      { userID: 1, date: "2019/06/21", numOunces: 94 }
    ],
    activityData: [
      {
        userID: 1,
        date: "2019/06/15",
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16
      },
      {
        userID: 1,
        date: "2019/06/16",
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10
      },
      {
        userID: 1,
        date: "2019/06/17",
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33
      },
      {
        userID: 1,
        date: "2019/06/18",
        numSteps: 3486,
        minutesActive: 114,
        flightsOfStairs: 32
      },
      {
        userID: 1,
        date: "2019/06/19",
        numSteps: 11374,
        minutesActive: 213,
        flightsOfStairs: 13
      },
      {
        userID: 1,
        date: "2019/06/20",
        numSteps: 14810,
        minutesActive: 287,
        flightsOfStairs: 18
      },
      {
        userID: 1,
        date: "2019/06/21",
        numSteps: 2634,
        minutesActive: 107,
        flightsOfStairs: 5
      }
    ],
    sleepData: [
      {
        userID: 1,
        date: "2019/06/15",
        hoursSlept: 6.1,
        sleepQuality: 5
      },
      { userID: 1, date: "2019/06/16", hoursSlept: 5.4, sleepQuality: 3 },
      {
        userID: 1,
        date: "2019/06/17",
        hoursSlept: 8.1,
        sleepQuality: 3.5
      },
      {
        userID: 1,
        date: "2019/06/18",
        hoursSlept: 6.1,
        sleepQuality: 3.5
      },
      { userID: 1, date: "2019/06/19", hoursSlept: 4.7, sleepQuality: 4 },
      {
        userID: 1,
        date: "2019/06/20",
        hoursSlept: 10.1,
        sleepQuality: 1.3
      },
      {
        userID: 1,
        date: "2019/06/21",
        hoursSlept: 7.9,
        sleepQuality: 5
      }
    ]
  }
};

describe("Calculator", function() {
  let calculator;
  let database;

  beforeEach("instantiate new calculator", function() {
    calculator = new Calculator(state.currentUser.id);
    database = new Database(hydrationDataTest, activityDataTest, sleepDataTest);
  });

  it("should be an instance of calculator", function() {
    expect(calculator).to.be.an.instanceof(Calculator);
  });

  describe("Calculator-Utility", function() {
    it("should convert a string into a date object", function() {
      expect(calculator.stringToDate("2019/06/17")).to.deep.equal(
        new Date("2019", "05", "17")
      );
    });

    it("should convert a date object into a string", function() {
      expect(calculator.dateToString(new Date("2019", "05", "17"))).to.equal(
        "2019/06/17"
      );
    });

    it("should modify a date object", function() {
      const sunday = new Date("2019", "05", "23");
      const monday = new Date("2019", "05", "24");
      expect(calculator.modifyDate(sunday, 1)).to.equalDate(monday);
      expect(calculator.modifyDate(monday, -1)).to.equalDate(sunday);
    });

    it("should return a week day by name", function() {
      const sunday = new Date("2019", "05", "23");
      const monday = new Date("2019", "05", "24");
      expect(calculator.getWeekDay(sunday)).to.equal("Sunday");
      expect(calculator.getWeekDay(monday)).to.equal("Monday");
    });

    it("should return percentages for a dataset", function() {
      const dataset = calculator.getUserWeekTotal(
        state.currentUserData.sleepData,
        "2019/06/21",
        "hoursSlept"
      ).metrics;
      console.log(calculator.getPercentages(dataset));
      expect(calculator.getPercentages(dataset)).to.deep.equal([
        60,
        53,
        80,
        60,
        47,
        100,
        78
      ]);
    });
  });

  describe("Calculator-Hydration", function() {
    it("should return user average ounces", function() {
      expect(
        calculator.getUserAllTimeAvg(
          state.currentUserData.hydrationData,
          "numOunces"
        )
      ).to.equal(66.71);
    });

    it("should return user ounces by date", function() {
      expect(
        calculator.getUserDayTotal(
          state.currentUserData.hydrationData,
          "2019/06/17",
          "numOunces"
        )
      ).to.equal(47);
    });

    it("should return ounces per day over the past seven days inclusive", function() {
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.hydrationData,
          "2019/06/21",
          "numOunces"
        ).dates.length
      ).to.equal(7);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.hydrationData,
          "2019/06/21",
          "numOunces"
        ).metrics.length
      ).to.equal(7);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.hydrationData,
          "2019/06/21",
          "numOunces"
        ).metrics[0]
      ).to.equal(37);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.hydrationData,
          "2019/06/21",
          "numOunces"
        ).metrics[6]
      ).to.equal(94);
    });
  });

  describe("Calculator-Sleep", function() {
    it("should return user average hours slept", function() {
      expect(
        calculator.getUserAllTimeAvg(
          state.currentUserData.sleepData,
          "hoursSlept"
        )
      ).to.equal(6.91);
    });

    it("should return user average sleep quality", function() {
      expect(
        calculator.getUserAllTimeAvg(
          state.currentUserData.sleepData,
          "sleepQuality"
        )
      ).to.equal(3.61);
    });

    it("should return user hours slept by date", function() {
      expect(
        calculator.getUserDayTotal(
          state.currentUserData.sleepData,
          "2019/06/21",
          "hoursSlept"
        )
      ).to.equal(7.9);
    });

    it("should return user sleep quality by date", function() {
      expect(
        calculator.getUserDayTotal(
          state.currentUserData.sleepData,
          "2019/06/21",
          "sleepQuality"
        )
      ).to.equal(5);
    });

    it("should return hours slept per day over the past seven days inclusive", function() {
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.sleepData,
          "2019/06/21",
          "hoursSlept"
        ).dates.length
      ).to.equal(7);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.sleepData,
          "2019/06/21",
          "hoursSlept"
        ).metrics.length
      ).to.equal(7);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.sleepData,
          "2019/06/21",
          "hoursSlept"
        ).metrics[0]
      ).to.equal(6.1);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.sleepData,
          "2019/06/21",
          "hoursSlept"
        ).metrics[6]
      ).to.equal(7.9);
    });

    it("should return sleep quality per day over the past seven days inclusive", function() {
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.sleepData,
          "2019/06/21",
          "sleepQuality"
        ).dates.length
      ).to.equal(7);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.sleepData,
          "2019/06/21",
          "sleepQuality"
        ).metrics.length
      ).to.equal(7);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.sleepData,
          "2019/06/21",
          "sleepQuality"
        ).metrics[0]
      ).to.equal(5);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.sleepData,
          "2019/06/21",
          "sleepQuality"
        ).metrics[6]
      ).to.equal(5);
    });

    it("should return all user average sleep quality", function() {
      expect(
        calculator.getAllUserAllTimeAvg("sleepData", database, "sleepQuality")
      ).to.equal(3);
    });
  });

  describe("Calculator-Activity", function() {
    it("should return the miles a user traversed for a given date", function() {
      expect(calculator.stepsToMiles(state, "2019/06/15")).to.equal(2.91);
    });

    it("should return user flights by date", function() {
      expect(
        calculator.getUserDayTotal(
          state.currentUserData.activityData,
          "2019/06/18",
          "flightsOfStairs"
        )
      ).to.equal(32);
    });

    it("should return user steps by date", function() {
      expect(
        calculator.getUserDayTotal(
          state.currentUserData.activityData,
          "2019/06/18",
          "numSteps"
        )
      ).to.equal(3486);
    });

    it("should return user minutes by date", function() {
      expect(
        calculator.getUserDayTotal(
          state.currentUserData.activityData,
          "2019/06/18",
          "minutesActive"
        )
      ).to.equal(114);
    });

    it("should return minutes active per day over the past seven days inclusive", function() {
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.activityData,
          "2019/06/21",
          "minutesActive"
        ).dates.length
      ).to.equal(7);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.activityData,
          "2019/06/21",
          "minutesActive"
        ).metrics.length
      ).to.equal(7);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.activityData,
          "2019/06/21",
          "minutesActive"
        ).metrics[0]
      ).to.equal(140);
      expect(
        calculator.getUserWeekTotal(
          state.currentUserData.activityData,
          "2019/06/21",
          "minutesActive"
        ).metrics[6]
      ).to.equal(107);
    });

    it("should return a boolean if step goal met by date", function() {
      expect(calculator.stepGoalMet(state, "2019/06/15")).to.equal(false);
      expect(calculator.stepGoalMet(state, "2019/06/20")).to.equal(true);
    });

    it("should return all days user exceeded step goal", function() {
      expect(calculator.getDaysStepGoalMet(state)).to.deep.equal([
        "2019/06/19",
        "2019/06/20"
      ]);
    });

    it("should return user highest number of flights all time", function() {
      expect(
        calculator.getUserAllTimeMax(
          state.currentUserData.activityData,
          "flightsOfStairs"
        )
      ).to.equal(33);
    });

    it("should return all user average flights by date", function() {
      expect(
        calculator.getAllUserAllTimeAvg(
          "activityData",
          database,
          "flightsOfStairs"
        )
      ).to.equal(23.07);
    });

    it("should return all user average steps by date", function() {
      expect(
        calculator.getAllUserAllTimeAvg("activityData", database, "numSteps")
      ).to.equal(4397.75);
    });

    it("should return all user average minutes by date", function() {
      expect(
        calculator.getAllUserAllTimeAvg(
          "activityData",
          database,
          "minutesActive"
        )
      ).to.equal(87.11);
    });
  });

  describe("Calculator-Trends", function() {
    it("should return an array of arrays containing dates when steps increased day to day three days or more in a row", function() {
      expect(
        calculator.getTrend(state.currentUserData.activityData, "numSteps")
      ).to.deep.equal([
        ["2019/06/15", "2019/06/16", "2019/06/17"],
        ["2019/06/18", "2019/06/19", "2019/06/20"]
      ]);
    });
  });
  describe('Report Card', function() {

    it('should return a grade for a users daily steps', function() {
      let dS1 = 15000;
      let dS2 = 10000;
      let dS3 = 7000;
      let dS4 = 4000;
      let dS5 = 2000;
      expect(calculator.calculateStepsGrade(dS1).grade).to.equal('A');
      expect(calculator.calculateStepsGrade(dS2).grade).to.equal('B');
      expect(calculator.calculateStepsGrade(dS3).grade).to.equal('C');
      expect(calculator.calculateStepsGrade(dS4).grade).to.equal('D');
      expect(calculator.calculateStepsGrade(dS5).grade).to.equal('F');
    });

    it('should return a grade for a users daily flights climbed', function() {
      let f1 = 50;
      let f2 = 25;
      let f3 = 8;
      let f4 = 2;
      let f5 = 0;
      expect(calculator.calculateFlightsGrade(f1).grade).to.equal('A');
      expect(calculator.calculateFlightsGrade(f2).grade).to.equal('B');
      expect(calculator.calculateFlightsGrade(f3).grade).to.equal('C');
      expect(calculator.calculateFlightsGrade(f4).grade).to.equal('D');
      expect(calculator.calculateFlightsGrade(f5).grade).to.equal('F');
    });

    it('should return a grade for a users daily minutes active', function() {
      let mA1 = 260;
      let mA2 = 150;
      let mA3 = 100;
      let mA4 = 50;
      let mA5 = 45;
      expect(calculator.calculateMinutesActiveGrade(mA1).grade).to.equal('A');
      expect(calculator.calculateMinutesActiveGrade(mA2).grade).to.equal('B');
      expect(calculator.calculateMinutesActiveGrade(mA3).grade).to.equal('C');
      expect(calculator.calculateMinutesActiveGrade(mA4).grade).to.equal('D');
      expect(calculator.calculateMinutesActiveGrade(mA5).grade).to.equal('F');
    });

    it('should return a grade for a users daily steps', function() {
      let sQ1 = 4.5;
      let sQ2 = 3.5;
      let sQ3 = 2.5;
      let sQ4 = 1.5;
      let sQ5 = 1;
      expect(calculator.calculateSleepQualGrade(sQ1).grade).to.equal('A');
      expect(calculator.calculateSleepQualGrade(sQ2).grade).to.equal('B');
      expect(calculator.calculateSleepQualGrade(sQ3).grade).to.equal('C');
      expect(calculator.calculateSleepQualGrade(sQ4).grade).to.equal('D');
      expect(calculator.calculateSleepQualGrade(sQ5).grade).to.equal('F');
    });

    it('should return a grade for a users daily steps', function() {
      let sL1 = 8.2;
      let sL2 = 7.5;
      let sL3 = 6.5;
      let sL4 = 5;
      let sL5 = 3;
      expect(calculator.calculateSleepLengthGrade(sL1).grade).to.equal('A');
      expect(calculator.calculateSleepLengthGrade(sL2).grade).to.equal('B');
      expect(calculator.calculateSleepLengthGrade(sL3).grade).to.equal('C');
      expect(calculator.calculateSleepLengthGrade(sL4).grade).to.equal('D');
      expect(calculator.calculateSleepLengthGrade(sL5).grade).to.equal('F');
    });

    it('should return a grade for a users daily hydration', function() {
      let h1 = 100;
      let h2 = 70;
      let h3 = 51;
      let h4 = 50;
      let h5 = 30;
      expect(calculator.calculateHydrationGrade(h1).grade).to.equal('A');
      expect(calculator.calculateHydrationGrade(h2).grade).to.equal('B');
      expect(calculator.calculateHydrationGrade(h3).grade).to.equal('C');
      expect(calculator.calculateHydrationGrade(h4).grade).to.equal('D');
      expect(calculator.calculateHydrationGrade(h5).grade).to.equal('F');
    });

    it('should return an overall grade that is an average of all other grades', function() {
      let dailyGrades = {
        stepsGrade: calculator.calculateStepsGrade(9567),
        flightsGrade: calculator.calculateFlightsGrade(6),
        minutesActiveGrade: calculator.calculateMinutesActiveGrade(100),
        sleepQualGrade: calculator.calculateSleepQualGrade(4.9),
        sleepLengthGrade: calculator.calculateSleepLengthGrade(8.2),
        hydrationGrade: calculator.calculateHydrationGrade(10)
      }
      expect(calculator.calculateOverallGrade(dailyGrades)).to.equal('C');
    });
  });
});
