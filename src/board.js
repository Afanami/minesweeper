export class Board {
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
      if (neighbourRowIndex >= 0 && !(neighbourRowIndex > numberOfRows) &&
      neighbourColumnIndex >= 0 && !(neighbourColumnIndex > numberOfColumns)) {
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
