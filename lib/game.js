let game_data = {}

module.exports.createGame = gameID => {
    game_data[gameID] = {
		board: [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ], 
		won: -1,
		turn: 1
	}
}

module.exports.calculateLogic = (gameID, player, i, j) => {
    let game = game_data[gameID]
    let brd = this.getBoard(gameID)
	if (game.won == -1 && game.turn == player && brd[i][j] == -1) {
        brd[i][j] = player;

        game.turn = player == 0 ? 1 : 0

        if (brd[i][0] == brd[i][1] && brd[i][0] == brd[i][2] ||
            brd[0][j] == brd[1][j] && brd[0][j] == brd[2][j] ||
            brd[0][0] == brd[1][1] && brd[0][0] == brd[2][2] && brd[0][0] == player ||
            brd[0][2] == brd[1][1] && brd[0][2] == brd[2][0] && brd[0][2] == player) game.won = player; 
	}
}

module.exports.getGame = gameID => game_data[gameID]

module.exports.getBoard = gameID => game_data[gameID].board

module.exports.getGames = () => game_data