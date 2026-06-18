import express from "express"

import userRoutes from './routes/user.js'

const port = 3000;

// create our express app
const app = express();

// serve static files like css to the client 
app.use(express.static('public'));

// turn the urlencoded data into something we can work with
app.use(express.urlencoded())

// setup our view engine
app.set('view engine', 'ejs');

// user data
let user = {
    name: 'bob',
    age: 50
}

// cat data
let cats = [
    "https://cdn2.thecatapi.com/images/21e.jpg",
    "https://cdn2.thecatapi.com/images/bqo.jpg",
    "https://cdn2.thecatapi.com/images/yFwzO96ds.jpg"
]

// route for POST request
app.post("/submit", (req, res) => {
    console.log('POST route');
    console.log(req.body);
    res.redirect('/somewhereelse');
})

// send cat images
app.get('/cats', (req, res) => {
    res.json(cats);
})

// route will redirect to /home
app.get('/', (req, res) => {
    res.redirect('/home');
})

// create a route for our index view
app.get('/home', (req, res) => {
    // render our view called "index"
    res.render('index', { user, cats })
})

// bring in our user routes
app.use("/user", userRoutes)

// add a middleware for checking for an api key
app.use((req, res, next) => {
    if (req.query.api_key) {     
        console.log('passed api key check: ' + req.query.api_key)       
        // passed the check and continue on to the next middleware or route
        next()
    } else {
        throw new Error('error message here')
    }
})

// add the middleware to our app
app.use((req, res, next) => {
    console.log(req.method, req.url);
    // take us to the next middleware or the next route
    next()
})

// create a route
app.get("/", (req, res) => {
    console.log('Reached Route')
    res.send("Hello World");
})

// starting our server
app.listen(port, () => {
    console.log('Listening on port: ' + port)
})

// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500).send('something went wrong')
})


let data = "123;"

// fetch(url, {
//     method: 'POST',
//     body: JSON.stringify(data)
// })