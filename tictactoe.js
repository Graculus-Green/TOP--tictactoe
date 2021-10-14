

const makePlayer = (playerName, mark, turn, playerWins) => {
    const getplayerName = () => playerName;
    const getMark = () => mark;
    const getTurn = () => turn;
    const getPlayerWins = () => playerWins;
    return {getplayerName, getMark, getTurn, getPlayerWins};
};

const X = makePlayer("X", "&#215;", true, 0);
const O = makePlayer("O", "&#11096;", false, 0);

let currentPlayer = X;

const init = (() => {
    let board = ["","","","","","","","","",];

    const restart = () => {   
        // Not working yet
        init.board = ["","","","","","","","","",];
    }
    document.querySelector(".currentPlayer").innerHTML = `Current player is :${currentPlayer.getplayerName()}`;
    return {board, restart}
})();

const restart = () => {

}
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
            winGame.win();
            
            
            }
        }));
        
    };
//check for win
    return {place};
})();

const winGame = ((player) => {
    let board = init.board;
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

    const checkWin = () => {winningPatterns.forEach((pattern) => {
        let i = pattern[0], j = pattern[1], k = pattern[2];
        if(board[i]!="" && board[i]==board[j] && board[j]==board[k]) {
            console.log(`Player ${currentPlayer.getplayerName()} wins.`);

            document.querySelector(".winner").innerHTML= `winner is: ${currentPlayer.getplayerName()}`;
            
            return true;
        }
      });
    };

    const win = () => {
    //if any winningPatterns in playerMarkList => win
        if (checkWin()) {
            init.restart();
        }
        //else if freeCell == true = > switchPlayer
        else if (board.includes("")) {
            turn();
            return document.querySelector(".currentPlayer").innerHTML = `Current player is :${currentPlayer.getplayerName()}`;
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

