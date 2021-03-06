const latestActivity = {
  generateHtmlString(id, state) {
    const calculator = new Calculator(id);
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
    const userMiles = calculator.stepsToMiles(state, state.currentDay);
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

    const userAllTimeSteps = calculator.getUserAllTimeAvg(
      state.currentUserData.activityData,
      "numSteps"
    );
    const userAllTimeActive = calculator.getUserAllTimeAvg(
      state.currentUserData.activityData,
      "minutesActive"
    );
    const userAllTimeMiles = calculator.stepsToMiles(state, state.currentDay);
    const userAllTimeFloorsClimbed = calculator.getUserAllTimeAvg(
      state.currentUserData.activityData,
      "flightsOfStairs"
    );

    const overallSleep = calculator.getUserAllTimeAvg(
      state.currentUserData.sleepData,
      "hoursSlept"
    );
    const overallSleepQuality = calculator.getUserAllTimeAvg(
      state.currentUserData.sleepData,
      "sleepQuality"
    );

    const overallHydration = calculator.getUserAllTimeAvg(
      state.currentUserData.hydrationData,
      "numOunces"
    );

    return `
      <h2>Latest 24hrs</h2>
      <div class="activity-data-today-1 widget-block red">
        <i class="fas fa-shoe-prints"></i>
        <p class="user-daily-steps-js widget-label">${userDailySteps} <span class="small-label">steps</span></p>
        <i class="far fa-clock"></i>
        <p class="user-daily-active-time-js widget-label">${userActiveTime} <span class="small-label">min</span></p>
      </div>
      <div class="light-red activity-data-today-2 widget-block">
        <i class="fas fa-ruler"></i>
        <p class="user-daily-miles widget-label">${userMiles} <span class="small-label">miles</span></p>
        <i class="far fa-building"></i>
        <p class="user-daily-floors-js widget-label">${userFloorsClimbed} <span class="small-label">floors</span></p>
      </div>
      <div class="sleep-data-today widget-block yellow">
        <i class="fas fa-bed"></i>
        <p class="user-daily-sleep-js widget-label">${userSleep} <span class="small-label">hrs</span></p>
        <i class="far fa-thumbs-up"></i>
        <p class="user-daily-sleep-quality-js widget-label">${userSleepQuality} <span class="small-label">quality</span></p>
      </div>
      <div class="sleep-data-today widget-block blue">
        <i class="fas fa-mug-hot"></i>
        <p class="user-daily-hydration-js widget-label">${userHydration} <span class="small-label">oz</span></p>
      </div>
    `;
  }
};
