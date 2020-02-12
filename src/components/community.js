const community = {
  generateHtmlString(averages) {
    const communityDailySteps = averages[1][1];
    const communityActiveTime = averages[2][1];
    const communityMiles = averages[1][1];
    const communityFloorsClimbed = averages[3][1];
    const communitySleep = averages[4][1];
    const communitySleepQuality = averages[5][1];
    const communityHydration = averages[0][1];

    return `<div class="challenge-flex-container">
    <h2 class="community-label">Community Average</h2>
    <select name="community-average-select" id="community-select-view">
      <option value="data-summary">All-time</option>
      <option value="hydration-chart">Today</option>
    </select>
    </div>
    <div class="activity-data-today-1 widget-block red">
      <i class="fas fa-shoe-prints"></i>
      <p class="user-daily-steps-js">${communityDailySteps}</p>
      <i class="fas fa-walking"></i>
      <p class="user-daily-active-time-js">${communityActiveTime}</p>
    </div>
    <div class="light-red activity-data-today-2 widget-block">
      <i class="fas fa-ruler"></i>
      <p class="user-daily-miles">${communityMiles}</p>
      <i class="far fa-building"></i>
      <p class="user-daily-floors-js">${communityFloorsClimbed}</p>
    </div>
    <div class="sleep-data-today widget-block yellow">
      <i class="fas fa-bed"></i>
      <p class="user-daily-sleep-js">${communitySleep}</p>
      <i class="far fa-thumbs-up"></i>
      <p class="user-daily-sleep-quality-js">${communitySleepQuality}</p>
    </div>
    <div class="sleep-data-today widget-block blue">
      <i class="fas fa-mug-hot"></i>
      <p class="user-daily-hydration-js">${communityHydration}oz</p>
    </div>`;
  }
};

// <h2 class="middle-label">Community Daily Average</h2>
// <div class="sleep-data-community-average widget-block-small">
//   <i class="fas fa-bed"></i>
//   <p class="overall-sleep-js">8.2hrs</p>
//   <i class="far fa-thumbs-up"></i>
//   <p class="overall-sleep-quality-js">3</p>
//   <i class="fas fa-mug-hot"></i>
//   <p class="overall-hydration-js">55oz</p>
// </div>
//
// <div class="sleep-data-today-average widget-block-small">
//   <i class="fas fa-bed"></i>
//   <p class="user-daily-sleep-js">${overallSleep}</p>
//   <i class="far fa-thumbs-up"></i>
//   <p class="average-daily-sleep-quality-js">${overallSleepQuality}</p>
//   <i class="fas fa-mug-hot"></i>
//   <p class="average-daily-hydration-js">${overallHydration}oz</p>
// </div>
