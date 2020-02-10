class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.address = user.address;
    this.email = user.email;
    this.strideLength = user.strideLength;
    this.dailyStepGoal = user.dailyStepGoal;
    this.friends = user.friends;
    this.avatar = null;
  }

  getFirstName() {
    return this.name.split(" ", 1).toString();
  }

  getAvatar() {
    return this.avatar;
  }
}

if (typeof module !== "undefined") {
  module.exports = User;
}
