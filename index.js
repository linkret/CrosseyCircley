const express = require('express');
const ejs = require('ejs');
const app = express();
const game = require('./lib/game')
const port = 8000;

let cur_game = 0

app.set('view engine', 'ejs');

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
app.use('/public', express.static('public'));

app.get('/game', (req, res) => {
    let q = req.query;
    const gameData = game.getGame(q.game)

    if (!gameData)
        return res.render('error', { error: 'Game not found' });

    let boardColor = '#c7c7c7';
    if (gameData.won != -1)
        boardColor = (gameData.won == q.player) ? '#6ec06e' : '#ce5249';

    let data = Object.assign(gameData, {
        player: q.player,
        game: q.game,
        boardColor
    });

    res.render('game', data);
});

app.get('/move', (req, res) => {
    let q = req.query;

    game.calculateLogic(q.game, q.player, q.i, q.j)

    res.redirect(`../game/?game=${q.game}&player=${q.player}`);
});

app.get('/', (req, res) => {
    res.render('index', {
        games: Object.keys(game.getGames())
    });
});

app.get('/new-game', (req, res, next) => {
    newId = cur_game++;
    game.createGame(newId)
    res.redirect(`game/?game=${newId}&player=0`);
});

app.listen(port, () => {
    console.log('Running...');
});