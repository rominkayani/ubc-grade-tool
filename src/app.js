const path = require('path')
const express = require('express')
const hbs = require('hbs')
const gradefinder = require('./utils/gradefinder')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'UBC Grades',
        name: 'Romin Kayani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Romin Kayani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Romin Kayani'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Please provide a location!'
        })
    }

    if (!req.query.course) {
        return res.send({
            error: 'Please provide a course!'
        })
    }

    if (!req.query.year) {
        return res.send({
            error: 'Please provide a year!'
        })
    }

    if (!req.query.percentage) {
        return res.send({
            error: 'Please provide a minimum percentage!'
        })
    }

    gradefinder(req.query, (error, forecastData) => {
        if (error) {
            return res.send({error})
        }

        res.send({
            forecast: forecastData,
        })
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Romin Kayani',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Romin Kayani',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})