

let express = require('express'),
    mongoose = require('mongoose'),
    colors = require('colors')
    cors = require('cors'),
    dotenv = require('dotenv').config()
    dbConfig = require('./config/db');
    path = require('path');
    bodyParser = require('body-parser');
const app = express()

// // เรียกใช้ app

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ extended: false ,limit:'50mb'}))
app.use(cors());
app.use(bodyParser.json())


app.use('/posts', require('./routes/post.routes'))
app.use('/users', require('./routes/user.routes'))
app.use('/submitjob', require('./routes/jobapp.routes'))
app.use('/search', require('./routes/search.routes'))


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {useNewUrlParser: true,  useUnifiedTopology: true
    })
    .then(() => {
    console.log('Database successfully connected');
}, 
    error => {
        console.log('Could not connect to database: ' + error)
    }
)



// ใช้ deploy project
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')))           

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../build/index.html"))   
    })
}
// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
  }

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))
// const server = app.listen(port, () => {
//     console.log('Connected to port ' + port)
// })

// 404 Error
app.use((req, res, next) => {
    next(createError(404))
})

// Error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})
