const welcome = {
  generateHtmlString(state) {
    let name = state.currentUser.getFirstName();
    return `
      <img class="user-profile__image" src="${state.currentUser.avatar}" alt="User avatar">
      <h3 class="user-profile__name">${name}</h3>
    `;
  }
};
