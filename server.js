// app.js

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const authController = require('./controllers/authController');
const postController = require('./controllers/postController');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

// View engine setup
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.get('/', postController.getHomePage);
app.get('/dashboard', authController.isLoggedIn, postController.getDashboard);
app.get('/post/:id', postController.getPostDetails);
app.post('/post/comment', authController.isLoggedIn, postController.addComment);
app.get('/login', authController.getLoginForm);
app.post('/login', authController.login);
app.get('/signup', authController.getSignupForm);
app.post('/signup', authController.signup);
app.get('/logout', authController.logout);

// Connect to database and start server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
