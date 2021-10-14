
const makePlayer = (playerName, mark, turn, playerWins) => {
    const getplayerName = () => playerName;
    const getMark = () => mark;
    const getTurn = () => turn;
    const getPlayerWins = () => playerWins;
    return {getplayerName, getMark, getTurn, getPlayerWins};
};

const X = makePlayer("&#215;", "&#215;", true, 0);
const O = makePlayer("&#11096;", "&#11096;", false, 0);

let currentPlayer = X;

const init = (() => {
    let board = ["","","","","","","","","",];


    document.querySelector(".currentPlayer").innerHTML = `Current player is :${currentPlayer.getplayerName()}`;
    return {board}
})();



//Modules

const winGame = ((player) => {
    let gameOn = true;
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

    const checkWin = () => {
        
        for (let pattern = 0; pattern < winningPatterns.length; pattern++) {
            let i = winningPatterns[pattern][0], j = winningPatterns[pattern][1], k = winningPatterns[pattern][2];
            if(board[i]!=="" && board[i]==board[j] && board[j]==board[k]) {
                
                return true;
            };
        };
    };

    const turn = () => {  
        if (currentPlayer.getplayerName() === "&#215;") {
            return currentPlayer = O;
        }
        else {
            return currentPlayer = X;
        }  
    };

    const win = () => {
    //if any winningPatterns in playerMarkList => win
        if (checkWin()) {
            //document.querySelector(".winner").innerHTML= `winner is: ${winMark}`;
            init.board = ["_", `${currentPlayer.getplayerName()}`, "_","_", "I","S","W","I","N"]
            return document.querySelector(".winner").innerHTML= `The winner is: ${currentPlayer.getplayerName()}`;

            //init.restart();
        }
        //else if freeCell == true = > switchPlayer
        else if (board.includes("")) {
            turn();
            return document.querySelector(".currentPlayer").innerHTML = `Current player is :${currentPlayer.getplayerName()}`;
        }
        //else => draw
        else {
            return document.querySelector(".winner").innerHTML= `It's a draw.`;
        };
    };

    let place = () =>{
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', e => {

            console.log(init.board);
            if (init.board[e.target.id] != "") {
                console.log("That cell isn't available, choose another");
            }
            else {
            init.board[e.target.id] = `${currentPlayer.getplayerName()}`;
            e.target.innerHTML = currentPlayer.getMark();
            win();           
            }
        }));  
    };
    return {place, gameOn};
})();

let restart = () => {
    document.querySelector(".restart").addEventListener("click", () => {
        let check = confirm("Are you sure you want to restart?");
        if (check == true) {
            init.board = ["","","","","","","","","",];
            console.log(init.board);
            document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
            document.querySelector(".winner").innerHTML= "";
        }
    });
}

//let makeAI = () => {};

// Game logic

init;
winGame.place();
restart();




