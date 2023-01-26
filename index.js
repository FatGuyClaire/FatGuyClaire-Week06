// I built list of the 4 suits.
const suitEnum = Object.freeze({
  hearts: "♥",
  clubs: "♣",
  diamonds: "♦",
  spades: "♠",
});

// I built a list of the 13 ranks. 
const rankEnum = Object.freeze({
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  Jack: 11,
  Queen: 12,
  King: 13,
  Ace: 14,
});

// I built the Card class with a constructor to pair suit and rank to enable the creation of cards for the deck.
class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

// I built the Holds Cards class with methods to shuffle, deal, and receive a card, as well as a method to 
// determine if there are cards remaining. 

class HoldsCards {
  list = [];
  shuffle() {
    let currentIndex = this.list.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.list[currentIndex], this.list[randomIndex]] = [
        this.list[randomIndex],
        this.list[currentIndex],
      ];
    }
  }
  deal() {
    return this.list.shift();
  }
  receiveACard(card) {
    this.list.push(card);
  }
  hasCards() {
    return this.list.length > 0;
  }
}

// I created the Deck class (that extend Holds Cards) with a constructor to create every card in the deck.
class Deck extends HoldsCards {
  constructor() {
    super();
    for (const suit in suitEnum) {
      for (const rank in rankEnum) {
        this.receiveACard(new Card(suitEnum[suit], rankEnum[rank]));
      }
    }
  }
}

// I created the Player class (that extends Holds Cards) with a method to score points.
class Player extends HoldsCards {
  score = 0;
  scorePoint() {
    this.score++;
  }
}

// I created the War Game class with a constructor to create 2 players. The class calls for the creation of a deck,
// the shuffling of the deck, the distribution of the cards to each player, the running of the game, and the scoring
// of points. 
class WarGame {
  constructor() {
    this.player1 = new Player();
    this.player2 = new Player();
    const deck = new Deck();
    deck.shuffle();
    while (deck.hasCards()) {
      this.player1.receiveACard(deck.deal());
      this.player2.receiveACard(deck.deal());
    }
    while (this.player1.hasCards() && this.player2.hasCards()) {
      const card1 = this.player1.deal();
      const card2 = this.player2.deal();
      if (card1.rank === card2.rank) {
        continue;
      }
      if (card1.rank > card2.rank) {
        this.player1.scorePoint();
      } else this.player2.scorePoint();
    }
  }
  // I created a method to return the score for each player and to declare the winner. 
  toString() {
    let result = `Player 1 score ${this.player1.score}. Player 2 score ${this.player2.score}.`;
    if (this.player1.score === this.player2.score) {
      return result + " It's a tie!";
    }
    if (this.player1.score > this.player2.score) {
      return result + " Player 1 is the winner!";
    } else return result + " Player 2 is the winner!";
  }
}

// I created a method to call the game and print the results.
const game = new WarGame();
console.log(game.toString());
