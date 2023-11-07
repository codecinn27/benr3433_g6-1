const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const path = require('path');
const methodOverride = require('method-override'); 
const ejsMate = require('ejs-mate'); 
const mongoose = require('mongoose');
const Visitor = require('./model/visitor');
const bcrypt = require('bcrypt');
const url = 'mongodb+srv://codecinnpro:gIZ6Fhy6WplkFJfE@cluster0.egrjwh1.mongodb.net/vms_1';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        console.log("Connection OPEN!!!");
    })
    .catch(err=>{
        console.log("Oh No Error!!!");
        console.log(err);
    });


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json());
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login',async(req,res)=>{
  res.render('login')
})

app.post('/login', async(req,res)=>{
  const {username, password} = req.body;
  const result = await login(username, password,res);
})

// app.post('/login',async(req,res)=>{
//   const visitors = await Visitor.find({});
//   if 
// })

app.get('/admin', async(req,res)=>{
  const visitors = await Visitor.find({});
  res.render('admin', {visitors});
})

app.get('/welcome', async(req,res)=>{
  const username = req.query.username;
  res.render('welcome', {username})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


async function login(user, pass,res) {
  const found = await Visitor.findOne({username: user});
  if (found){
    const result = bcrypt.compare(pass, found.password);
    if(result){
      if(found.username =='admin'){
        res.redirect('/admin');
      }else{
        res.redirect(`/welcome?username=${found.username}`);
      }
    }else{
      console.log('Incorrect username or password');
      res.redirect('/login');
    }
  }

}
