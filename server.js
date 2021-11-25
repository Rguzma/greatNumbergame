const express = require('express');
// new code:
var session = require('express-session');
// original code:
var app = express();


app.use(express.static(__dirname + "/static"));
console.log (__dirname);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');




// require body-parser
app.use( express.urlencoded({extended:true}) );
app.use(session({
    secret: 'cat',
    // resave: true,
    // saveUninitialized: false,
    // cookie: {},

}));

var x=0;
var y =0;


app.get ('/', function(req, res){
    // console.log("get recibe numbers: "+numbers);
    
    var message="";
    let xValue = Number.isInteger(x);
    console.log("this is xValue: "+xValue);
    let yValue = Number.isInteger(y);
    console.log("this is yValue: "+yValue);
    console.log("aqui van los numeros: "+x,+" "+y);
    if (req.session.guess){
        if (x>y){
            
            message="Too Low!";
            console.log(message);
        }
        else if  (x<y) {
            message="Too High!";
        console.log(message);
        }
        else{
            message="You Got It!";
        console.log(message);
        }
        res.render('guess', {x,y, message});
    }
    
    else{console.log("lado incorrecto");
    res.render('index', { message});
    };
});

app.post('/submit', function (req, res){
    console.log("POST DATA \n\n", req.body);
    x= Math.floor(Math.random() *100 + 1);
    console.log(x);
    y = req.body.guess;
    req.session.guess = req.body.guess;
    // // var numbers={
    // //     x,
    // //     y
    // // }
    // console.log("post envia numbers: "+numbers)
    res.redirect('/');
});

app.post('/reset', function (req, res){
    req.session.destroy() 
    res.redirect('/');
});




app.listen(8080, function (){//final

	console.log("the user server is running in port 8080");
});
