var express = require('express'),
app = express(),
port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/public'));
app.use(express.logger());

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.locals.title = 'Stroke';
app.locals.users = 0;
app.locals.version = '0.0.1';

app.get('/', function(req,res) {
	res.render('index');
});

app.listen(port, host);
