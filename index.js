require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const bodyParser = require('body-parser')
//var task = ["Buy socks", "Practice with nodejs"]
const path = require('path')

app.use(express.json())

const users = []






// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middelware
app.use(express.urlencoded({extended:false}))

// session middleware
app.use(session({
    secret: 'process.env.SUPER_SECRET_SECRET',
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))


// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})

//index route
app.get('/', function(req, res) {
    res.render('index');
})

app.get('/users', (req, res) => {
    const user = { name: req.body.name, password: req.body.password}
    user.push(user)
    res.status(201).send()
})

app.use(bodyParser.urlencoded({extended: true}));

//post route for adding new task
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
//add the new task from the post route into the array
    task.push(newTask);
//after adding to the array go back to the root route
    res.redirect("/");
});
//render the ejs and display added task, task(index.ejs) = task(array)
app.get("/", function(req, res) {    
  res.render("index", { task: task, complete: complete });
});


app.listen(3000, ()=>{
    console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("todo_app running on port 3000")
})