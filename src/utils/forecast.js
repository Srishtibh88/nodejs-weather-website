const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d3811a6d6995591a5fdded0355a6c20c&query=' + lat + ',' + long

    request({ url: url, json:true }, (error, response) => {

        if(error) {
            callback('Unable to connect', undefined) 
        }else if(response.body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. Its ' + response.body.current.temperature + ' degrees out. It feels like ' 
                                +  response.body.current.feelslike + ' degrees out. There are ' + response.body.current.precip + '% chances of rain. The humidity is ' + response.body.current.humidity + '%.')
        }
    })

}

module.exports = forecast