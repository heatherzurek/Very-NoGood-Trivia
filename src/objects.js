export class Game {
  constructor(){
    this.numPlayers = 0;
    this.activePlayer = 1;
    this.players = [];
  }
}

export class Player {
  constructor(name){
    this.name = name;
    this.score = 0;
  }

  getScore(){
    return this.score;
  }

  addScore() {
    this.score++;
  }
}