const express = require('express');
const ejs = require('ejs');
const app = express();
const game = require('./lib/game')
const port = 8000;

app.set('view engine', 'ejs');

cur_game = 0;
game_data = {};

app.get('/game', (req, res) => {
	var q = req.query;
	if (!game.getGame(q.game)) return res.send('Game not found')
	var data = Object.assign(game.getGame(q.game), {
		game: q.game,
		player: q.player
	});
	res.render('game', data);
});

app.get('/move', (req, res) => {
	var q = req.query;

	game.calculateLogic(q.game, q.player, q.i, q.j)

	res.redirect(`../game/?game=${q.game}&player=${q.player}`);
});

app.get('/', (req, res) => {
	res.render('index', {
		games: Object.keys(game.getGames())
	});
});

app.use('/new-game', (req, res, next) => {
	newId = cur_game++;
	game.createGame(newId)
	res.redirect(`game/?game=${newId}&player=0`);
});

app.listen(port, () => {
	console.log('Running...');
});