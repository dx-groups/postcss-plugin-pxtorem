var express = require('express');
var webpackHandle = require("./webpack/webpackHandle");
// var route = require("./server/route/index");
var bodyParser = require("body-parser");
app = express();

webpackHandle(app);

app.set('port', process.env.PORT || 3333);

app.use(express.static('./dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route(app);


app.listen(app.get('port'), function() {
    console.log(`服务启动 http://localhost: ${app.get('port')}`);
});
