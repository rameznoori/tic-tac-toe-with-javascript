const prompt = require('prompt-sync')();
let game_board = [' ', ' ',' ',' ',' ',' ',' ',' ',' '];
let current_player = '❌';
let game_active = true;

function print_board() {
    console.log(`
        ${game_board[0]} | ${game_board[1]} | ${game_board[2]}

        ${game_board[3]} | ${game_board[4]} | ${game_board[5]}
        
        ${game_board[6]} | ${game_board[7]} | ${game_board[8]}
        `);
}

function handle_moves(position) {
    if(game_board[position] === " ") {
        game_board[position] = current_player;
    }
    else {
        console.log("Cell already taken, please choose another one.");
        return false;
    }

    if(check_win()) {
        print_board();
        console.log(`Player ${current_player} won!`);
        game_active = false;
        return true;
    }

    if(game_board.every(cell => cell !== " ")) {
        print_board();
        console.log("Draw!");
        game_active = false;
        return true;
    }

    current_player = current_player === "❌" ? "⭕️" : "❌";
    return true;
}

function check_win() {
    const conditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    return conditions.some(condition => {
        const [a,b,c] = condition;
        return game_board[a] === current_player && game_board[b] === current_player && game_board[c] === current_player;
    });
}

while(game_active) {
    print_board();
    const position = prompt(`Player ${current_player}, Your move (0-8): `);

    if(position >= 0 && position <=8) {
        handle_moves(parseInt(position));
    }
    else {
        console.log("Inavlid position, enter a number between 0 and 8.");
    }
}