const init = (() => {
    let board = ["","","","","","","","","",];
    return {board}
})();

const makePlayer = (playerName, mark, turn, playerWins) => {
    const getplayerName = () => playerName;
    const getMark = () => mark;
    const getTurn = () => turn;
    const getPlayerWins = () => playerWins;
    return {getplayerName, getMark, getTurn, getPlayerWins};
};

const X = makePlayer("X", "&#215;", true, 0);
const O = makePlayer("O", "&#11096;", false, 0);

let currentPlayer = O;

const turn = () => {  
    if (currentPlayer.getplayerName() === "X") {
        return currentPlayer = O;
    }
    else {
        return currentPlayer = X;
    }
}

//Modules

const placeMarker = (() => {

    let place = () =>{
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', e => {
            if (init.board[e.target.id] !== "") {
                console.log("That cell isn't available, choose another");
            }
            else {
            init.board[e.target.id] = `${currentPlayer.getplayerName()}`;
            e.target.innerHTML = currentPlayer.getMark();
            turn();
            }
        }));
        
    };
//check valid
//place mark
//check for win
    return {place};
})();

const winGame = ((player) => {
    const winningPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    const checkWin = () => {winningPatterns.forEach(pattern => pattern.forEach(mark => {
        if (mark => mark.every( v => v === mark[0])) {
            if (mark !== "") {
                return true;
            }
            return true
        }
    })
    )};
    const win = () => {
    //if any winningPatterns in playerMarkList => win
        if (checkWin === true) {
            return console.log( `Player ${currentPlayer} wins`);
        }
        //else if freeCell == true = > switchPlayer
        else if (init.board.includes("")) {
            return turn();
        }
        //else => draw
        else {
            return "Draw"
        };
    };
return {win};
})();

let makeAI = () => {

};

// Game logic
init;
placeMarker.place(currentPlayer.getMark());
winGame.win();
