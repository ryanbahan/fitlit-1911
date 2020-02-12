(() => {
  // Global state object
  const state = {
    currentUser: null,
    currentUserData: null,
    currentDay: null
  };

  // Instantiate UserRepository, User instances
  // Set state.currentUser to the current userId
  const userRepository = new UserRepository(userData);
  userRepository.instantiateUsers(User);
  const randomId = userRepository.getRandomUserId();
  state.currentUser = userRepository.getUserData(randomId);

  // Set avatar for currentUser and each id in state.currentUser.friends
  userRepository.setUserAvatar(state.currentUser.id);
  state.currentUser.friends.forEach(friendId => {
    userRepository.setUserAvatar(friendId);
  });

  // Instantiate database to hold all Hydration, Sleep, Activity data
  // Set state.currentUserData to the data of the currentUser
  const database = new Database(hydrationData, activityData, sleepData);
  state.currentUserData = database.filterUser(state.currentUser.id);
  state.currentDay = database.getCurrentDay(state.currentUserData);

  const calculator = new Calculator(state.currentUser.id);
  const communityAllTimeAverages = calculator.getAllAverages(database, 'allTime');
  const communityDayAverages = calculator.getAllAverages(database, 'daily', state.currentDay);

  dom.communityAllTimeAvg = communityAllTimeAverages;
  dom.communityDailyAvg = communityDayAverages;

  // Start invoking render method
  // Please use state.currentDay for calculator date calls
  // Settings widget
  const settingsHtmlString = settings.generateHtmlString(state.currentUser);
  dom.render(dom.settings, settingsHtmlString);

  // Friends widget
  const friendsHtmlString = friends.generateHtmlString(state, userRepository);
  dom.render(dom.friends, friendsHtmlString);


  // Welcome name widget
  const welcomeHtmlString = welcome.generateHtmlString(state);
  dom.render(dom.welcome, welcomeHtmlString);

// Create calendar and add event listener
  let date = document.querySelector(".flatpickr");

  flatpickr(date, {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y/m/d",
    maxDate: "2019/09/22",
    minDate: "2019/06/15"
});


  let cal = document.querySelector(".flatpickr")

  cal.addEventListener("change", function() {
    state.currentDay = cal.value;
    refreshPage();
  });

  refreshPage()

  function refreshPage(){
    dom.clear(dom.latestWeek);
    dom.clear(dom.latestActivity);
    dom.clear(dom.allTime);
    dom.clear(dom.challenges);
    dom.clear(dom.community);
    dom.clear(dom.reportCard);

    // Instantiate a new state of challenge to get data for the current user and their friends
    const challengeState = new Challenge(state.currentUser);
    challengeState.getUsers(state.currentUser);
    challengeState.getUsersData(
      Calculator,
      database.activityData,
      userRepository.users,
      state.currentDay
    );

  // Latest Activity widget
  const latestActivityHtmlString = latestActivity.generateHtmlString(
    state.currentUser.id,
    state
  );
  dom.render(dom.latestActivity, latestActivityHtmlString);

  // Latest week widget
  const latestWeekHtmlString = latestWeek.generateHtmlString(state);
  dom.render(dom.latestWeek, latestWeekHtmlString);
  dom.latestWeekDataSummary = document.querySelector(".data-summary");
  dom.latestWeekSummaryChart = document.querySelector(".summary-chart");
  dom.latestWeekSummaryChartCtx = document
    .getElementById("summary-chart")
    .getContext("2d");
  dom.latestWeekHydrationChart = document.querySelector(".hydration-chart");
  dom.latestWeekHydrationChartCtx = document
    .getElementById("hydration-chart")
    .getContext("2d");
  dom.latestWeekSleepChart = document.querySelector(".sleep-chart");
  dom.latestWeekSleepChartCtx = document
    .getElementById("sleep-chart")
    .getContext("2d");
  latestWeek.generateSummaryChart();
  latestWeek.generateHydrationChart();
  latestWeek.generateSleepChart();
  dom.bindEvents(dom.latestWeek, "change", dom.handleLatestWeekSelect);

    // Challenge widget
    const challengeHtmlString = challenge.generateHtmlString(challengeState);
    dom.render(dom.challenges, challengeHtmlString);

    // Community widget
    const communityHtmlString = community.generateHtmlString(communityAllTimeAverages);
    dom.render(dom.community, communityHtmlString);
    dom.bindEvents(dom.community, "change", dom.handleCommunitySelect);

    // All-time widget
    const allTimeHtmlString = allTime.generateHtmlString(state);
    dom.render(dom.allTime, allTimeHtmlString);

    // Report Card widget
    const reportCardHtmlString = reportCard.generateHtmlString(state);
    dom.render(dom.reportCard, reportCardHtmlString);
  }
})();
