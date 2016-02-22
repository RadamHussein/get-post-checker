var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home.handlebars') //We can omit the .handlebars extension as we do below
});

/*chainable route handler found in express documentation 
http://expressjs.com/en/guide/routing.html
*/
app.route('/get-or-post')
  .get(function(req, res) {
    var paramArr = [];
    for (var p in req.query){
      paramArr.push({'name':p, 'value':req.query[p]})
    }
    var context = {};
    context.paramList = paramArr;
    context.type = "GET"; 
    res.render('get-or-post', context);
  })
  .post(function(req, res) {
    var paramArr = [];
    var bodyArr = [];
    for (var p in req.query) {
      paramArr.push({'name':p, 'value':req.query[p]})
    }
    for (var p in req.body){
      bodyArr.push({'body-name':p, 'body-value':req.body[p]})
    }
    var context = {};
    context.paramList = paramArr;
    context.bodyList = bodyArr;
    context.type = "POST";
    context.header = "Body String Pairs:"; 
    res.render('get-or-post', context);
  });

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
