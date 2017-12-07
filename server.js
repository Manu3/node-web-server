const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 9090;
var app = express();

//to render the page -- help.html
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
var now = new Date().toString();

var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log', log + '\n', (err) =>{
if(err){
  console.log('unable to connect');
}
})
next();
});

//to show maintenace middleware---  do not use next-- app stops here. as we are declaring and functions executes down.
/*
app.use((req, res, next) =>{
  res.render('maintenance.hbs');
});
*/
//register handle bars... used when we have same data on all pages.. without arguments

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

//register handle bars... used when we have same data on all pages.. with arguments

hbs.registerHelper('screamIt', (text) => {
  return text;
});
app.get('/', (req, res) => {
//to render template on the home page
  res.render('home.hbs',{
    year: '2017',
    title: 'Manu'
  });
  //res.send('hello server is ready');
});
app.get('/about', (req, res) => {
  res.render('about.hbs',{
    year: '2017',
    title: 'Manu'
  });
});
app.get('/projects', (req, res) => {
  res.render('projects.hbs',{
    year: '2017',
    title: 'My Projects'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`server is up at Heroku port: ${port}`);
});
