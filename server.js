//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const Item = require('./models/browse.js');
const Suggestion = require('./models/suggestions.js');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.render(
    'home.ejs'
  )
});

// CONTACT 

app.get('/contact', (req, res) => {
  res.render(
    'contact.ejs'
  )
})

// LINKS 

app.get('/links', (req, res) => {
  res.render(
    'links.ejs'
  )
})

// CART 

app.get('/cart', (req, res) => {
  res.render(
    'cart.ejs'
  )
})

// SUGGESTIONS

app.get('/suggestions', (req, res) => {
  Suggestion.find({}, (error, data) => {
    res.render(
      'suggestions.ejs',
      {
        suggestion: data
      }
    )
  })
  
})

// DELETE SUGGESTIONS

app.delete('/suggestions/:id', (req, res) => {
  Suggestion.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/suggestions')
  })
})

// EDIT SUGGESTIONS

app.get('/suggestions/:id/edit', (req, res) => {
  Suggestion.findById(req.params.id, (error, data) => {
    res.render(
      'edit_suggestions.ejs',
      {
        suggestion: data
      }
    )
  })
})

// SUGGESTIONS PUT

app.put('/suggestions/:id', (req, res) => {
  Suggestion.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, data) => {
    res.redirect('/suggestions')
  })
})



//NEW SUGGESTIONS

app.get('/suggestions/new', (req, res) => {
  res.render('new_suggestions.ejs')
})

//SHOW PAGE SUGGESTIONS

app.get('/suggestions/:id', (req, res) => {
  Suggestion.findById(req.params.id, (error, data) => {
    res.render(
      'show_suggestions.ejs',
      {
        suggestion: data
      }
    )
  })
})

//POSTING NEW SUGGESTIONS

app.post('/suggestions', (req, res) => {
  Suggestion.create(req.body, (error, data) => {
    res.redirect('/suggestions')
  })
})

// BROWSE

app.get('/browse', (req, res) => {
  Item.find({}, (error, data) => {
    res.render(
      'browse.ejs',
      {
        items: data
      }
    )
  })
})

// BROWSE SHOW 

app.get('/browse/:id', (req, res) => {
  Item.findById(req.params.id, (error, data) => {
    res.render(
      'show_browse.ejs',
      {
        item: data
      }
    )
  })
})

// SEED SUGGESTIONS

app.get('/suggestions/seed', (req, res) => {
  Suggestion.create(
    [
      {
        name: 'The Scream',
        img: 'https://www.brushwiz.com/images/top-100/top_100_paintings_the_scream_by_edvard_munch.jpg',
        description: `Edvard Munch's painting The Scream is one of the most recognized pieces of art in history. It is known for its depiction of a single figure amid a chaotic landscape, hands clasped to his face in a look of utter despair It is an image that has been parodied and built upon many times in pop culture since the painting's debut in 1893. `,
        price: 100000
      }
    ],
    (err, data)=>{
      res.redirect('/suggestions')
    }
  )
})

// SEED BROWSE
app.get('/browse/seed', (req, res) => {
  Item.create(
    [
      {
        name: 'Mona Lisa',
        img: 'https://i.imgur.com/xhntSYL.jpeg',
        price: 90000000
      },
      {
        name: 'American Gothic',
        img: '', 
        price: 80000000
      },
      {
        name: 'Girl with a Pearl Earring',
        img: '',
        price: 60000000
      },
      {
        name: 'The Creation of Adam', 
        img: '',
        price: 30000000
      }, {
        name: 'The Wanderer Above The Sea Of Fog',
        img: '',
        price: 10000000
      }, {
        name: 'The Tower Of Babel',
        img: '',
        price: 5000000
      }

    ],
    (err, data)=>{
      res.redirect('/browse')
    }
  )
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));