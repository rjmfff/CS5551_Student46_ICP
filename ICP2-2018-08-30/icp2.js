/* Rachel Singh */

var app = angular.module( "WeatherApp", [] );
app.controller( "WeatherController", function( $scope ) {
    $scope.weather = [ { time: "a", condition: "b", temperature: "c", feelslike: "d"} ];
    
    $scope.initialize = function() {
        $scope.city = "Olathe";
        $scope.state = "KS";
        $scope.findWeather( $scope.city, $scope.state );
    }

    $scope.findWeather = function( city, state ) {
        var apiStringBase = "http://api.wunderground.com/api/4bbbc25f4f5946dd/hourly/q/"; //state%20code/cityname.json";
        var apiString = apiStringBase + state + "/" + city + ".json";
        console.log( apiString );

        
        $.getJSON( apiString, function( data ) {
            $scope.weather = [];
            
            for ( var h = 0; h < 5; h++ )
            {
                console.log( data["hourly_forecast"][h]["FCTTIME"]["hour"] + ":" + data["hourly_forecast"][h]["FCTTIME"]["min"] );
                $scope.weather.push( {
                        time:           data["hourly_forecast"][h]["FCTTIME"]["hour"] + ":" + data["hourly_forecast"][h]["FCTTIME"]["min"],
                        condition:      data["hourly_forecast"][h]["condition"],
                        temperature:    data["hourly_forecast"][h]["temp"]["english"] + " F / " + data["hourly_forecast"][h]["temp"]["metric"] + " C",
                        feelslike:      data["hourly_forecast"][h]["feelslike"]["english"] + " F / " + data["hourly_forecast"][h]["temp"]["metric"] + " C"
                    } );
            }
        } );
    }

    $scope.getWeather = function() {
        $scope.findWeather( $scope.city, $scope.state );
    }
} );



