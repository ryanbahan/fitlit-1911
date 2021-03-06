const dom = {
  allTime: document.querySelector(".all-time"),
  challenges: document.querySelector(".challenge-goals"),
  community: document.querySelector(".community"),
  communityAllTimeAvg: null,
  communityDailyAvg: null,
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
  latestWeekActivityChart: null,
  latestWeekActivityChartCtx: null,
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
      dom.latestWeekActivityChart,
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
        dom.latestWeekActivityChart.classList.remove("is-hidden");
        break;
      case 4:
        dom.latestWeekDataSummary.classList.remove("is-hidden");
        break;
      default:
        break;
    }
  },
  handleCommunitySelect(e) {
    const { selectedIndex } = e.target;
    const dataContainers = [
      ...dom.community.querySelectorAll(".community-data")
    ];

    switch (selectedIndex) {
      case 0:
        dataContainers[0].innerHTML = dom.communityAllTimeAvg[1][1].toFixed(0);
        dataContainers[1].innerHTML = dom.communityAllTimeAvg[2][1].toFixed(0);
        dataContainers[2].innerHTML = dom.communityAllTimeAvg[1][1].toFixed(2);
        dataContainers[3].innerHTML = dom.communityAllTimeAvg[3][1].toFixed(0);
        dataContainers[4].innerHTML = dom.communityAllTimeAvg[4][1].toFixed(1);
        dataContainers[5].innerHTML = dom.communityAllTimeAvg[5][1].toFixed(1);
        dataContainers[6].innerHTML = dom.communityAllTimeAvg[0][1].toFixed(0);
        break;
      case 1:
        dataContainers[0].innerHTML = dom.communityDailyAvg[1][1];
        dataContainers[1].innerHTML = dom.communityDailyAvg[2][1];
        dataContainers[2].innerHTML = dom.communityDailyAvg[1][1];
        dataContainers[3].innerHTML = dom.communityDailyAvg[3][1];
        dataContainers[4].innerHTML = dom.communityDailyAvg[4][1];
        dataContainers[5].innerHTML = dom.communityDailyAvg[5][1];
        dataContainers[6].innerHTML = dom.communityDailyAvg[0][1];
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
  },

  clear(targetNode) {
    targetNode.innerHTML = "";
  }
};
