const latestWeek = {
  renderRows(rows, suffix, renderDate = true) {
    let dates = rows.dates;
    let metrics = rows.metrics;
    let htmlString = "";

    dates.forEach((date, i) => {
      let dateString = `${date.toString().charAt(0)}:`;

      htmlString += `
        <p class="latest-week__type"><span class="latest-week__type-date">${
          renderDate ? dateString : ""
        }</span> <span>${metrics[i]}${suffix}</span></p>`;
    });

    return htmlString;
  },
  generateHydrationChart() {
    let hydrationChart = new Chart(dom.latestWeekHydrationChartCtx, {
      type: "bar",
      data: {
        labels: this.hydrationOunces.dates.map(date =>
          date.toString().charAt(0)
        ),
        datasets: [
          {
            label: "Ounces consumed per day",
            data: this.hydrationOunces.metrics,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: true,
                color: "rgba(255,99,132,0.2)"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    });
  },
  generateSleepChart() {
    Chart.defaults.global.elements.line.fill = false;

    let sleepChart = new Chart(dom.latestWeekSleepChartCtx, {
      type: "line",
      data: {
        labels: this.sleepHours.dates.map(date => date.toString().charAt(0)),
        datasets: [
          {
            label: "Hours slept",
            data: this.sleepHours.metrics,
            fill: false,
            borderColor: "rgba(255, 133, 133, 0.8)",
            pointBackgroundColor: "rgba(255, 133, 133, 0.8)",
            pointBorderColor: "rgba(152, 255, 251, 1)",
            pointHoverBackgroundColor: "rgba(152, 255, 251, 1)",
            pointHoverBorderColor: "rgba(152, 255, 251, 1)"
          },
          {
            label: "Sleep quality",
            data: this.sleepQuality.metrics,
            fill: false,
            borderColor: "rgba(152, 255, 251, 1)",
            pointBackgroundColor: "rgba(152, 255, 251, 1)",
            pointBorderColor: "rgba(255, 133, 133, 0.8)",
            pointHoverBackgroundColor: "rgba(255, 133, 133, 0.8)",
            pointHoverBorderColor: "rgba(255, 133, 133, 0.8)"
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  },
  generateSummaryChart() {
    Chart.defaults.global.elements.line.fill = false;

    let summaryChart = new Chart(dom.latestWeekSummaryChartCtx, {
      type: "line",
      data: {
        labels: this.sleepHours.dates.map(date => date.toString().charAt(0)),
        datasets: [
          {
            label: "Hydration",
            data: this.hydrationOunces.metrics,
            fill: false,
            borderColor: "rgba(152, 255, 251, 1)",
            pointBackgroundColor: "rgba(152, 255, 251, 1)",
            pointBorderColor: "rgba(152, 255, 251, 1)",
            pointHoverBackgroundColor: "rgba(152, 255, 251, 1)",
            pointHoverBorderColor: "rgba(152, 255, 251, 1)"
          },
          {
            label: "Sleep",
            data: this.sleepHours.metrics,
            fill: false,
            borderColor: "rgba(255, 255, 123, 0.8)",
            pointBackgroundColor: "rgba(255, 255, 123, 0.8)",
            pointBorderColor: "rgba(255, 255, 123, 0.8)",
            pointHoverBackgroundColor: "rgba(255, 255, 123, 0.8)",
            pointHoverBorderColor: "rgba(255, 255, 123, 0.8)"
          },
          {
            label: "Activity",
            data: this.activityMinutes.metrics,
            fill: false,
            borderColor: "rgba(255, 133, 133, 0.8)",
            pointBackgroundColor: "rgba(255, 133, 133, 0.8)",
            pointBorderColor: "rgba(255, 133, 133, 0.8)",
            pointHoverBackgroundColor: "rgba(255, 133, 133, 0.8)",
            pointHoverBorderColor: "rgba(255, 133, 133, 0.8)"
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  },
  generateHtmlString(state) {
    this.calculator = new Calculator(state.currentUser.id);
    this.hydrationOunces = this.calculator.getUserWeekTotal(
      state.currentUserData.hydrationData,
      state.currentDay,
      "numOunces"
    );
    this.sleepHours = this.calculator.getUserWeekTotal(
      state.currentUserData.sleepData,
      state.currentDay,
      "hoursSlept"
    );
    this.sleepQuality = this.calculator.getUserWeekTotal(
      state.currentUserData.sleepData,
      state.currentDay,
      "sleepQuality"
    );
    this.activitySteps = this.calculator.getUserWeekTotal(
      state.currentUserData.activityData,
      state.currentDay,
      "numSteps"
    );
    this.activityMinutes = this.calculator.getUserWeekTotal(
      state.currentUserData.activityData,
      state.currentDay,
      "minutesActive"
    );
    this.activityFlights = this.calculator.getUserWeekTotal(
      state.currentUserData.activityData,
      state.currentDay,
      "flightsOfStairs"
    );

    return `
      <div class="latest-week__wrapper">
        <h2 class="latest-week__title-main">This Week</h2>
        <select name="latest-week-select" id="select-week-view" aria-label="Select data or chart view">
          <option value="summary-chart">Chart summary</option>
          <option value="hydration-chart">Hydration chart</option>
          <option value="sleep-chart">Sleep chart</option>
          <option value="data-summary">Data summary</option>
        </select>
      </div>
      <article class="chart-container summary-chart">
        <canvas id="summary-chart"></canvas>
      </article>
      <article class="chart-container hydration-chart is-hidden">
        <canvas id="hydration-chart"></canvas>
      </article>
      <article class="chart-container sleep-chart is-hidden">
        <canvas id="sleep-chart"></canvas>
      </article>
      <div class="data-summary latest-week__wrapper is-hidden">
        <div class="latest-week__wrapper-hydration">
          <h2 class="latest-week__title">Hydration</h2>
          <div class="latest-week__content">
            <article class="latest-week__article latest-week__hydration">
              ${this.renderRows(this.hydrationOunces, "oz")}
            </article>
          </div>
        </div>
        <div class="latest-week__wrapper-sleep">
          <h2 class="latest-week__title">Sleep hours @ quality</h2>
          <div class="latest-week__content">
            <article class="latest-week__article latest-week__sleep">
              ${this.renderRows(this.sleepHours, "h")}
            </article>
            <article class="latest-week__article latest-week__sleep">
              ${this.renderRows(this.sleepQuality, "", false)}
            </article>
          </div>
        </div>
        <div class="latest-week__wrapper-activity">
          <h2 class="latest-week__title">Steps / flights / minutes active</h2>
            <div class="latest-week__content">
              <article class="latest-week__article latest-week__activity">
                ${this.renderRows(this.activitySteps, "")}
              </article>
              <article class="latest-week__article latest-week__activity">
                ${this.renderRows(this.activityFlights, "", false)}
              </article>
              <article class="latest-week__article latest-week__activity">
                ${this.renderRows(this.activityMinutes, "m", false)}
            </article>
          </div>
        </div>
      </div>
    `;
  }
};
