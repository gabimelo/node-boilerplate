var server = require(__dirname + '/server.js')();

var app = server.app.express();

app.use(server.app.express.static(server.app.path.join(__dirname, '/public')));
if(process.env.NODE_ENV !== 'test') {
	app.use(server.app.morgan('dev'));
}
app.engine('html', server.app.ejs.renderFile);
app.set('view engine', 'html');
app.set('views', server.app.path.join(__dirname, '/public'));
app.use(server.app.bodyParser.urlencoded({ extended: false }));
app.use(server.app.bodyParser.json());
app.use(server.app.methodOverride());

app.use(server.app.cors());

server.router(app);

app.listen(process.env.PORT || 8000, function(){
	console.log("Server is on, listening on: 8000");
});

module.exports = app; // for testing