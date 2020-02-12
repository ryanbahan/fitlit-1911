const dom = {
  allTime: document.querySelector(".all-time"),
  challenges: document.querySelector(".challenge-goals"),
  community: document.querySelector(".community"),
  friends: document.querySelector(".friends"),
  latestActivity: document.querySelector(".latest-activity"),
  latestWeek: document.querySelector(".latest-week"),
  main: document.querySelector("main"),
  reportCard: document.querySelector(".report-card"),
  latestWeekDataSummary: null,
  latestWeekHydrationChart: null,
  latestWeekHydrationChartCtx: null,
  latestWeekSleepChart: null,
  latestWeekSleepChartCtx: null,
  latestWeekSummaryChart: null,
  latestWeekSummaryChartCtx: null,
  settings: document.querySelector(".settings"),
  welcome: document.querySelector(".user-profile"),
  bindEvents(targetElement, eventType, handlerFunction) {
    targetElement.addEventListener(eventType, handlerFunction);
  },
  handleLatestWeekSelect(e) {
    const { selectedIndex } = e.target;
    const displays = [
      dom.latestWeekSummaryChart,
      dom.latestWeekHydrationChart,
      dom.latestWeekSleepChart,
      dom.latestWeekDataSummary
    ];

    displays.forEach(display => display.classList.add("is-hidden"));

    switch (selectedIndex) {
      case 0:
        dom.latestWeekSummaryChart.classList.remove("is-hidden");
        break;
      case 1:
        dom.latestWeekHydrationChart.classList.remove("is-hidden");
        break;
      case 2:
        dom.latestWeekSleepChart.classList.remove("is-hidden");
        break;
      case 3:
        dom.latestWeekDataSummary.classList.remove("is-hidden");
        break;
      default:
        break;
    }
  },
  stringToFragment(string) {
    let renderer = document.createElement("template");
    renderer.innerHTML = string;
    return renderer.content;
  },
  render(targetNode, htmlString) {
    const fragment = this.stringToFragment(htmlString);
    targetNode.appendChild(fragment);
  }
};
