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
    
    dailyGrades.overallGrade = calculator.calculateOverallGrade(dailyGrades)

    return `<h2>Report Card: ${dailyGrades.overallGrade}</h2>
            <h2>Your Daily Average</h2>
            <section>
              <div class="steps"><i class="fas fa-shoe-prints"></i>&nbsp;&nbsp;${userDailySteps}&nbsp;&nbsp;${dailyGrades.stepsGrade.grade}</div>
              <div class="flights"><i class="far fa-building"></i>&nbsp;&nbsp;${userFloorsClimbed}&nbsp;&nbsp;${dailyGrades.flightsGrade.grade}</div>
              <div class="minutes-active"><i class="fas fa-walking"></i>&nbsp;&nbsp;${userActiveTime}&nbsp;&nbsp;${dailyGrades.minutesActiveGrade.grade}</div>
              <div class="sleep-quality"><i class="far fa-thumbs-up"></i>&nbsp;&nbsp;${userSleepQuality}&nbsp;&nbsp;${dailyGrades.sleepQualGrade.grade}</div>
              <div class="sleep-time"><i class="fas fa-bed"></i>&nbsp;&nbsp;${userSleep}&nbsp;&nbsp;${dailyGrades.sleepLengthGrade.grade}</div>
              <div class="ounces-water"><i class="fas fa-mug-hot"></i>&nbsp;&nbsp;${userHydration}&nbsp;&nbsp;${dailyGrades.hydrationGrade.grade}</div>
            </section>`;

    function getGrades() {
      let grades = {
        stepsGrade: calculator.calculateStepsGrade(userDailySteps),
        flightsGrade: calculator.calculateFlightsGrade(userFloorsClimbed),
        minutesActiveGrade: calculator.calculateMinutesActiveGrade(userActiveTime),
        sleepQualGrade: calculator.calculateSleepQualGrade(userSleepQuality),
        sleepLengthGrade: calculator.calculateSleepLengthGrade(userSleep),
        hydrationGrade: calculator.calculateHydrationGrade(userHydration),
      };
      return grades;
    };
  }
}
