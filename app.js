var express = require('express'),
app = express(),
http = require('http'),
server = http.createServer(app),
logger = require('morgan'),
users = {},
io = require('socket.io').listen(server),
port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/public'));
app.use(logger());

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.locals.title = 'Stroke';
app.locals.users = 0;
app.locals.user_queue = [];
app.locals.version = '0.0.1';

function start_game(queue) {
    // make the first two players touch tips.
    if (!queue || queue.length < 2) return;
    var p1 = queue.shift(),
    p2 = queue.shift();

    // name the players - then send them the game file.
}

io.sockets.on('connection', function(socket) {

    app.locals.users++;

    io.sockets.emit('players', app.locals.users);
    
    socket.on('disconnect', function() {
	app.locals.users--;
	io.sockets.emit('players', app.locals.users);
    });
    
    socket.on('player_ready', function(a) {
	app.locals.user_queue.push(this.id);
	if (app.locals.user_queue.length === 2) {
	    start_game(app.locals.user_queue);
	}
    });

});
app.get('/', function(req,res) {
    res.render('index');
});

server.listen(port, host);
