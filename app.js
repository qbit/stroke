var express = require('express'),
app = express(),
port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/public'));
app.use(express.logger());

app.engine('html', require('ejs').renderFile);

app.listen(port, host);
