const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');

cur_game = 0;
game_data = {};

app.get('/game', (req, res) => {
	var q = req.query;
	var data = Object.create(game_data[q.game]);
	data.game = q.game;
	data.player = q.player;
	res.render('game', data);
});

app.get('/move', (req, res) => {
	var q = req.query;
	var brd = game_data[q.game].board;
	
	if (game_data[q.game].won == -1 && game_data[q.game].turn == q.player) {
		if (brd[q.i][q.j] == -1) {
			brd[q.i][q.j] = q.player;
			if (q.player == "0")
				game_data[q.game].turn = "1";
			else
				game_data[q.game].turn = "0";
			
			if (brd[q.i][0] == brd[q.i][1] && brd[q.i][0] == brd[q.i][2])
				game_data[q.game].won = q.player;
			if (brd[0][q.j] == brd[1][q.j] && brd[0][q.j] == brd[2][q.j])
				game_data[q.game].won = q.player;
			if (brd[0][0] == brd[1][1] && brd[0][0] == brd[2][2] && brd[0][0] == q.player)
				game_data[q.game].won = q.player;
			if (brd[0][2] == brd[1][1] && brd[0][2] == brd[2][0] && brd[0][2] == q.player)
				game_data[q.game].won = q.player;
		}
	}	
	
	res.redirect(`../game/?game=${q.game}&player=${q.player}`);
});

app.get('/', (req, res) => {
	res.render('index', {games: Object.keys(game_data)});
});

app.use('/new-game', (req, res, next) => {
	newId = cur_game++;
	game_data[newId] = {
		board: [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]], 
		won: -1,
		turn: 0
	};
	res.redirect(`game/?game=${newId}&player=0`);
});

app.listen(port, () => {
	console.log('Running...');
});