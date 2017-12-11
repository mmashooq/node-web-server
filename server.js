const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
hbs.registerPartials(__dirname+'/views/partials')
var app=express();
app.set('view engine','hbs');


hbs.registerHelper('CurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
})

app.use((req,res,next) =>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log +'\n', (err)=>{
    if(err)
    {
      console.log('unable to connect to server');
    }
  });
  next();
})

app.use((req,res,next)=>{
  res.render('maintenance.hbs');
//  next();
})
app.use(express.static(__dirname +'/public'));

app.get('/',(req,res) =>{
res.render('home.hbs',{
  pageTitle:'Sankeshwar Industries',
  WelcomeMessage:'welcome to my website',

})
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
  pageTitle:'about page',

});
});

app.get('/bad',(req,res)=>{
  res.send('unable to connect to server')
});

app.listen(3000,()=>{
  console.log('server is up on port 3000');
});
