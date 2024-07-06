const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: false }));
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
});

// View Engine
app.set('view engine', 'ejs');

// Database Connection
mongoose.connect('mongodb://localhost:27017/gconn', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/auth', authRoutes);

// Home Route
app.get('/', (req, res) => {
  res.render('index');
});

// Services Routes
app.get('/education', (req, res) => {
  res.render('education');
});

app.get('/finance', (req, res) => {
  res.render('finance');
});

app.get('/transportation', (req, res) => {
  res.render('transportation');
});

app.get('/healthcare', (req, res) => {
  res.render('healthcare');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
