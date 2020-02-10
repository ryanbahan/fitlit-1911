class UserRepository {
  constructor(userData) {
    this.userData = userData;
    this.users = [];
  }

  instantiateUsers(User) {
    this.userData.forEach(person => {
      this.users.push(new User(person));
    });
  }

  getUserData(id) {
    return this.users.find(user => user.id === id);
  }

  getAvgStepGoal() {
    return this.userData.reduce((total, { dailyStepGoal }) => {
      total += dailyStepGoal / this.userData.length;
      return total;
    }, 0);
  }

  getRandomUserId(min = 1, max = 50) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  setUserAvatar(id) {
    let selectedUser = this.getUserData(id);
    selectedUser.avatar = faker.image.avatar();
  }
}

if (typeof module !== "undefined") {
  module.exports = UserRepository;
}
