const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

//instantiate express
const app = express()

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kamal Patel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kamal Patel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is helpful text',
        title: 'Help',
        name: 'Kamal Patel'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide address"
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longitude, (error, forecastData) => {

                if (error) {
                    return res.send({ error });
                }

                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                });

            })
        })
    }
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: '404',
        name: 'Kamal Patel',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        name: 'Kamal Pate;',
        errorMessage: 'Page not found'
    })
})

//start server
app.listen(3000, () => {
    console.log('Server is up on port 3000');
})