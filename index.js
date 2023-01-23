const suitEnum = Object.freeze({
  hearts: "♥",
  clubs: "♣",
  diamonds: "♦",
  spades: "♠",
});

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

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

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

class Player extends HoldsCards {
  score = 0;
  scorePoint() {
    this.score++;
  }
}

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

const game = new WarGame();
console.log(game.toString());
