var express = require('express'),
app = express(),
http = require('http'),
server = http.createServer(app),
users = {},
io = require('socket.io').listen(server),
port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/public'));
//app.use(express.cookieParser(process.env.SECRET || 'omgdev'));
//app.use(express.cookieSession(process.env.SECRET || 'omgdev'));
//app.use(express.compress());

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.locals.title = 'Stroke';
app.locals.users = 0;
app.locals.version = '0.0.1';

io.sockets.on('connection', function(socket) {

	app.locals.users++;

	io.sockets.emit('players', app.locals.users);
	socket.on('disconnect', function() {
	    console.log('disconnect');
		app.locals.users--;
		io.sockets.emit('players', app.locals.users);
	});
});
app.get('/', function(req,res) {
	res.render('index');
});

server.listen(port, host);
