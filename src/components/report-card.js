const reportCard = {
  generateHtmlString(state) {
    const calculator = new Calculator(state.currentUser.id);
    const userDailySteps = calculator.getUserDayTotal(
      state.currentUserData.activityData,
      state.currentDay,
      "numSteps"
    );

    const userActiveTime = calculator.getUserDayTotal(
      state.currentUserData.activityData,
      state.currentDay,
      "minutesActive"
    );

    const userFloorsClimbed = calculator.getUserDayTotal(
      state.currentUserData.activityData,
      state.currentDay,
      "flightsOfStairs"
    );

    const userSleep = calculator.getUserDayTotal(
      state.currentUserData.sleepData,
      state.currentDay,
      "hoursSlept"
    );

    const userSleepQuality = calculator.getUserDayTotal(
      state.currentUserData.sleepData,
      state.currentDay,
      "sleepQuality"
    );

    const userHydration = calculator.getUserDayTotal(
      state.currentUserData.hydrationData,
      state.currentDay,
      "numOunces"
    );

    const dailyGrades = getGrades();

    dailyGrades.overallGrade = calculator.calculateOverallGrade(dailyGrades);

    return `<h1 class="report-card-title">Daily Report Card</h1>
            <section class="grade-container">
              <p class="overall-grade">Overall Score: ${dailyGrades.overallGrade}</p>
              <p class="report">Minutes Active:&nbsp;&nbsp;&nbsp;&nbsp;${dailyGrades.minutesActiveGrade.grade}</p>
              <p class="report">Sleep Quality:&nbsp;&nbsp;&nbsp;&nbsp;${dailyGrades.sleepQualGrade.grade}</p>
              <p class="report">Sleep Length:&nbsp;&nbsp;&nbsp;&nbsp;${dailyGrades.sleepLengthGrade.grade}</p>
              <p class="report">Hydration:&nbsp;&nbsp;&nbsp;&nbsp;${dailyGrades.hydrationGrade.grade}</p>
              <p class="report">Flights:&nbsp;&nbsp;&nbsp;&nbsp;${dailyGrades.flightsGrade.grade}</p>
              <p class="report">Steps: &nbsp;&nbsp;&nbsp;&nbsp;${dailyGrades.stepsGrade.grade}</p>
            </section>`;

    function getGrades() {
      let grades = {
        stepsGrade: calculator.calculateStepsGrade(userDailySteps),
        flightsGrade: calculator.calculateFlightsGrade(userFloorsClimbed),
        minutesActiveGrade: calculator.calculateMinutesActiveGrade(
          userActiveTime
        ),
        sleepQualGrade: calculator.calculateSleepQualGrade(userSleepQuality),
        sleepLengthGrade: calculator.calculateSleepLengthGrade(userSleep),
        hydrationGrade: calculator.calculateHydrationGrade(userHydration)
      };
      return grades;
    }
  }
};
