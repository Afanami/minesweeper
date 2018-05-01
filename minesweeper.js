// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('You blew up! Game Over!');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log("Wow! You're quite good...for a newbie. Congrats you won!");
    } else {
      console.log('Current board: ');
      this._board.print();
    }
  }
}


class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows*numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbourBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighbourBombs(rowIndex, columnIndex) {
    const neighbourOffsets = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
    const numberOfRows = this._bombBoard.length-1;
    const numberOfColumns = this._bombBoard[0].length-1;
    this._numberOfBombs = 0;
    neighbourOffsets.forEach(offset => {
      const neighbourRowIndex = rowIndex + offset[0];
      const neighbourColumnIndex = columnIndex + offset[1];
      if ((neighbourRowIndex >= 0) && !(neighbourRowIndex > numberOfRows) &&
      (neighbourColumnIndex >= 0) && !(neighbourColumnIndex > numberOfColumns)) {
        if(this._bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
          this._numberOfBombs++;
        }
      }
    });
    return this._numberOfBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'))
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for(let i = 0; i < numberOfRows; i++) {
      let row = [];
      for(let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for(let i = 0; i < numberOfRows; i++) {
      let row = [];
      for(let j = 0; j < numberOfColumns; j++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] != 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
      }
      numberOfBombsPlaced++;
    }
    return board;
  }
}

const g = new Game(3,3,3);
g.playMove(0,0);
g.playMove(1,1);
g.playMove(2,2);
g.playMove(0,1);
g.playMove(0,2);
g.playMove(1,2);
g.playMove(1,0);
g.playMove(2,0);
g.playMove(2,1);
