
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Defining paths for express config
const publicDir = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialsDir)

//Setup static directory
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Srishti',
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Srishti',
        title: 'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hello! I\'ll help you',
        title: 'Help',
        name: 'Srishti'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {  
            if(error){
                return res.send({
                    error
                })
            }
    
            res.send({
                location: data.location,
                address: req.query.address,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found!',
        title: '404',
        name: 'Srishti'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found!',
        title: '404',
        name: 'Srishti'
    })
})

app.listen(port, () => {
    console.log('Server running on port ' + port)
})

