const boardModel = document.createElement('a-entity');
boardModel.setAttribute('obj-model', "obj: url(assets/CustomBoard.obj); mtl: url(assets/CustomBoard.mtl);");
boardModel.setAttribute('position', { x: 0, y: 0, z: 0 });
boardModel.setAttribute('scale', { x: .001, y: .001, z:.001 });
document.querySelector('a-marker').appendChild(boardModel);
const chess = new Chess();

const setInitialBoard = () => {
  const boardState = chess.board();
  for (let row = 0; row < boardState.length; row++) {
    for (let square = 0; square < boardState[row].length; square++) {
      if (boardState[row][square]) {
        if (boardState[row][square].color === 'b') {
          switch (boardState[row][square].type) {
            case ('r'): {
              boardLocations[row][square].model = "obj: url(assets/BlackRook.obj); mtl: url(assets/BlackRook.mtl);";
              break;
            }
            case ('n'): {
              boardLocations[row][square].model = "obj: url(assets/BlackPawn.obj); mtl: url(assets/BlackPawn.mtl);";
              break;
            }
            case ('b'): {
              boardLocations[row][square].model = "obj: url(assets/BlackPawn.obj); mtl: url(assets/BlackPawn.mtl);";
              break;
            }
            case ('q'): {
              boardLocations[row][square].model = "obj: url(assets/BlackPawn.obj); mtl: url(assets/BlackPawn.mtl);";
              break;
            }
            case ('k'): {
              boardLocations[row][square].model = "obj: url(assets/BlackKing.obj); mtl: url(assets/BlackKing.mtl);";
              break;
            }
            case ('p'): {
              boardLocations[row][square].model = "obj: url(assets/BlackPawn.obj); mtl: url(assets/BlackPawn.mtl);";
              break;
            }
            default: {
              boardLocations[row][square].model = "obj: url(assets/blank.obj); mtl: url(assets/blank.obj);";
            }
          }
        } else if (boardState[row][square].color === 'w') {
          switch (boardState[row][square].type) {
            case ('r'): {
              boardLocations[row][square].model = "obj: url(assets/WhiteRook.obj); mtl: url(assets/WhiteRook.mtl);";
              break;
            }
            case ('n'): {
              boardLocations[row][square].model = "obj: url(assets/WhitePawn.obj); mtl: url(assets/WhitePawn.mtl);";
              break;
            }
            case ('b'): {
              boardLocations[row][square].model = "obj: url(assets/WhitePawn.obj); mtl: url(assets/WhitePawn.mtl);";
              break;
            }
            case ('q'): {
              boardLocations[row][square].model = "obj: url(assets/WhitePawn.obj); mtl: url(assets/WhitePawn.mtl);";
              break;
            }
            case ('k'): {
              boardLocations[row][square].model = "obj: url(assets/WhiteKing.obj); mtl: url(assets/WhiteKing.mtl);";
              break;
            }
            case ('p'): {
              boardLocations[row][square].model = "obj: url(assets/WhitePawn.obj); mtl: url(assets/WhitePawn.mtl);";
              break;
            }
            default: {
              boardLocations[row][square].model = "obj: url(assets/blank.obj); mtl: url(assets/blank.obj);";
            }
          }
        }
      } else {
        boardLocations[row][square].model = "obj: url(assets/blank.obj); mtl: url(assets/blank.mtl);";
      }
    }
  }
  for (let row = 0; row < boardLocations.length; row++) {
    for (let square = 0; square < boardLocations[row].length; square++) {
      const model = document.createElement('a-entity');
      model.id = `${letterEquivalents[square] + (row + 1)}`
      model.setAttribute('obj-model', boardLocations[row][square].model);
      model.setAttribute('position', { x: boardLocations[row][square].x, y: boardLocations[row][square].y, z: boardLocations[row][square].z });
      model.setAttribute('scale', { x: .2, y: .2, z: .2 });
      document.querySelector('a-marker').appendChild(model);
    }
  }
}




setInitialBoard();

const updateBoard = ({ to, from, color, piece }) => {
  const fromSquare = document.getElementById(from);
  const toSquare = document.getElementById(to);
  fromSquare.setAttribute('obj-model', 'obj: url(assets/blank.obj); mtl: url(assets/blank.obj);');
  toSquare.setAttribute('obj-model', modelList[(color + piece)]);
}

setInterval(() => {
  if (!chess.game_over()) {
    const moves = chess.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
    chess.move(move);
    updateBoard(move);
  } else {
    window.alert('Game Over!')
  }
}, 2500);