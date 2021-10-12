require('dotenv').config();

const 	express = require('express');
const 	cors = require('cors');
const 	bodyParser = require('body-parser');
const 	morgan = require('morgan');
const 	mongoose = require('mongoose');
const 	path = require('path');
const 	busboy = require('connect-busboy'); //Parse form data
const 	port = process.env.PORT || 8080;
const 	host = process.env.BASE_URL || 'http://127.0.0.1';

const app = express();
const   options = {
	socketTimeoutMS: 0,
	keepAlive: true
};

console.log('Starting new build');

mongoose.connect(process.env.DB, options).then(
	() => {console.log('Database is connected') },
	err => { console.log('Can not connect to the database'+ err)}
);

const server = require('http').createServer(app);

app.use(busboy());


app.use(express.static("public"));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:'1000000000',extended: true}));
app.set('appName', 'file-share-app');

app.set('views', path.join(__dirname + '/HTML'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use(cors());
app.options('*', cors());

app.use("/api/file",require("./routes/file"));

app.use(function (err, req, res, next) {
	console.log(err);
	res.status(200).send({'error':err.message || 'Unknown Error'});
});

server.listen(port, () => console.log(`listening on port ${port} + host ${host}`));
