/* Rachel Singh */

$( document ).ready( function() {

    apiStringBase = "http://api.wunderground.com/api/4bbbc25f4f5946dd/hourly/q/"; //state%20code/cityname.json";
    
    $( "#weatherButton" ).click( function() {
        FindWeather( $("#city").val(), $("#state").val() );
    } );

    function FindWeather( city, state ) {
        $( ".weather-entry" ).remove();
        $( "#which-city" ).html( city + ", " + state );
        var apiString = apiStringBase + state + "/" + city + ".json";
        console.log( apiString );

        $.getJSON( apiString, function( data ) {
            console.log( data );
            console.log( data["hourly_forecast"] );

            for ( var h = 0; h < 5; h++ )
            {
                tableStr = "<tr class='weather-entry'>"
                    + "<td>" + data["hourly_forecast"][h]["FCTTIME"]["hour"] + ":" + data["hourly_forecast"][h]["FCTTIME"]["min"] + "</td>" // time
                    + "<td>" + data["hourly_forecast"][h]["condition"] + "</td>" // condition
                    + "<td>" + data["hourly_forecast"][h]["temp"]["english"] + " &#176;F / " + data["hourly_forecast"][h]["temp"]["metric"] + " &#176;C</td>" // temperature
                    + "<td>" + data["hourly_forecast"][h]["feelslike"]["english"] + " &#176;F / " + data["hourly_forecast"][h]["temp"]["metric"] + " &#176;C</td>" // feels like
                    + "</tr>";
                $( "#weather-table" ).append( tableStr );
            }

            $( "#current-weather" ).slideDown( "fast" );
        } );
    }

    FindWeather( "Olathe", "KS" );
} );
