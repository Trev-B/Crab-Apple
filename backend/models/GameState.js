class GameState {
  constructor(black_cards, white_cards, players) {
    this.players = [...players];
    this.player_hands = new Map();
    this.black_cards = [...black_cards];
    this.white_cards = [...white_cards];
    this.discarded_cards = [];
    this.current_black_card = null;
    this.inplay_white_cards = [];
    this.name = 'TEST';
    // this.currentPlayer = host;
    // this.host = host;
  }

  // Draw a new card for each player

  // Change to the next players turn

  // Add white card to inplay white cards

  // Add to current inplay white cards to discard

  // Get new black card for next round

  // Increase a players score
}

function sendCurrentPlayers(userList) {
  const users = [];
  for (let user of userList.values()) users.push(user);
  return users;
}

module.exports = { GameState, sendCurrentPlayers };
