const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
                '.json?access_token=pk.eyJ1Ijoic3Jpc2h0aWJoYXRpYTk3IiwiYSI6ImNrZnMycXg4bTE3ZmoycXBhbXU0dTRtdW0ifQ._4FdkpEeDuUYCHC40i6kCQ&limit=1'

    request({url: url, json: true}, (error, response) => {

        if(error) {
            callback('Unable to connect', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],   
                location: response.body.features[0].place_name   
            })
        }
    })    
}

module.exports = geocode
