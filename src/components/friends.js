const friends = {
  generateHtmlString(state, userRepository) {
    let htmlString = `<h2 class="friend__title">Friends</h2>`;
    const friendIds = state.currentUser.friends;
    const friends = friendIds.map(id => {
      const friend = userRepository.getUserData(id);
      const firstName = friend.getFirstName();
      const avatar = friend.getAvatar();
      return { firstName, avatar };
    });

    friends.forEach(friend => {
      htmlString += `
        <div class="friend">
        <img class="friend__image" src="${friend.avatar}" alt="User avatar">
          <p class="friend__name">${friend.firstName}</p>
        </div>
      `;
    });

    return htmlString;
  }
};
