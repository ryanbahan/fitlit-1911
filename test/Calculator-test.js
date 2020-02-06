const chai = require('chai');
const { expect } = chai;
const Calculator = require('../src/classes/Calculator');
const userDataTest = require("../test-data/users-test");

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
      { userID: 1, date: '2019/06/15', numOunces: 37 },
      { userID: 1, date: '2019/06/16', numOunces: 75 },
      { userID: 1, date: '2019/06/17', numOunces: 47 },
      { userID: 1, date: '2019/06/18', numOunces: 85 },
      { userID: 1, date: '2019/06/19', numOunces: 42 },
      { userID: 1, date: '2019/06/20', numOunces: 87 },
      { userID: 1, date: '2019/06/21', numOunces: 94 }
    ],
    activityData: [
      {
        userID: 1,
        date: '2019/06/15',

        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16
      },
      {
        userID: 1,
        date: '2019/06/16',
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10
      },
      {
        userID: 1,
        date: '2019/06/17',
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33
      },
      {
        userID: 1,
        date: '2019/06/18',
        numSteps: 3486,
        minutesActive: 114,
        flightsOfStairs: 32
      },
      {
        userID: 1,
        date: '2019/06/19',
        numSteps: 11374,
        minutesActive: 213,
        flightsOfStairs: 13
      },
      {
        userID: 1,
        date: '2019/06/20',
        numSteps: 14810,
        minutesActive: 287,
        flightsOfStairs: 18
      },
      {
        userID: 1,
        date: '2019/06/21',
        numSteps: 2634,
        minutesActive: 107,
        flightsOfStairs: 5
      }
    ],
    sleepData: [
      {
        userID: 1,
        date: '2019/06/15',
        hoursSlept: 6.1,
        sleepQuality: 2.2
      },
      { userID: 1, date: '2019/06/16', hoursSlept: 5.4, sleepQuality: 3 },
      {
        userID: 1,
        date: '2019/06/17',
        hoursSlept: 8.1,
        sleepQuality: 3.5
      },
      {
        userID: 1,
        date: '2019/06/18',
        hoursSlept: 6.1,
        sleepQuality: 3.5
      },
      { userID: 1, date: '2019/06/19', hoursSlept: 4.7, sleepQuality: 4 },
      {
        userID: 1,
        date: '2019/06/20',
        hoursSlept: 10.1,
        sleepQuality: 1.3
      },
      {
        userID: 1,
        date: '2019/06/21',
        hoursSlept: 7.9,
        sleepQuality: 1.6
      }
    ]
  }
};

describe('Calculator', function() {
  let calculator;

  beforeEach("instantiate new calculator", function() {
     calculator = new Calculator(state.currentUser.id);
  })

  it('should be an instance of calculator', function() {
    expect(calculator).to.be.an.instanceof(Calculator)
  })

  describe('Hydration', function() {

    it("should get the user's total ounces for a given date" , function() {
      expect(calculator.getUserDayTotal(state.currentUserData.hydrationData, '2019/06/17', "numOunces")).to.equal(47);
    })
  })
})