const allTime = {
  generateHtmlString(state) {
    const calculator = new Calculator(state.currentUser.id);

    const allTimeAvgSteps = calculator.getUserAllTimeAvg(
      state.currentUserData.activityData,
      "numSteps",
      1
    );
    const allTimeAvgMinutes = calculator.getUserAllTimeAvg(
      state.currentUserData.activityData,
      "minutesActive",
      1
    );
    const allTimeAvgMiles = calculator.stepsToMiles(
      state,
      null,
      allTimeAvgSteps
    );
    const allTimeAvgFlights = calculator.getUserAllTimeAvg(
      state.currentUserData.activityData,
      "flightsOfStairs",
      10
    );
    const allTimeAvgHoursSlept = calculator.getUserAllTimeAvg(
      state.currentUserData.sleepData,
      "hoursSlept",
      10
    );
    const allTimeAvgSleepQuality = calculator.getUserAllTimeAvg(
      state.currentUserData.sleepData,
      "sleepQuality",
      100
    );
    const allTimeAvgHydration = calculator.getUserAllTimeAvg(
      state.currentUserData.hydrationData,
      "numOunces",
      1
    );

    return `
      <h2>All-time</h2>
      <div class="user-activity-data-all-time-1 widget-block red">
        <i class="fas fa-shoe-prints"></i>
        <p class="user-all-time-steps-js">${allTimeAvgSteps}</p>
        <i class="fas fa-walking"></i>
        <p class="user-all-time-active-time-js">${allTimeAvgMinutes}</p>
      </div>
      <div class="light-red user-activity-data-all-time-2 widget-block">
        <i class="fas fa-ruler"></i>
        <p class="user-all-time-miles">${allTimeAvgMiles}</p>
        <i class="far fa-building"></i>
        <p class="user-all-time-floors-js">${Math.round(allTimeAvgFlights)}</p>
      </div>
      <div class="user-sleep-data-all-time widget-block yellow">
        <i class="fas fa-bed"></i>
        <p class="user-all-time-sleep-js">${allTimeAvgHoursSlept}</p>
        <i class="far fa-thumbs-up"></i>
        <p class="user-all-time-sleep-quality-js">${allTimeAvgSleepQuality.toFixed(
          1
        )}</p>
      </div>
      <div class="user-sleep-data-all-time widget-block blue">
        <i class="fas fa-mug-hot"></i>
        <p class="user-all-time-hydration-js">${allTimeAvgHydration}oz</p>
      </div>
    `;
  }
};
