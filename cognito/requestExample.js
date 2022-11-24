var authToken;

global.authToken.then(function setAuthToken(token) {
    if (token) {
        authToken = token;
    } else {
        // posalji ga na signin
    }
}).catch(function handleTokenError(error) {
    // posalji ga na signin
});

$.ajax({
    method: 'POST',
    url: _config.api.invokeUrl + '/ride',
    headers: {
        Authorization: authToken
    },
    data: JSON.stringify({
        PickupLocation: {
            Latitude: pickupLocation.latitude,
            Longitude: pickupLocation.longitude
        }
    }),
    contentType: 'application/json',
    success: completeRequest,
    error: function ajaxError(jqXHR, textStatus, errorThrown) {
        console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
        console.error('Response: ', jqXHR.responseText);
        alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
    }
});

//na pocetku proovjerava token
WildRydes.authToken.then(function updateAuthMessage(token) {
    if (token) {
        displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
        $('.authToken').text(token);
    }
});

function completeRequest(result) {
    var unicorn;
    var pronoun;
    console.log('Response received from API: ', result);
    unicorn = result.Unicorn;
    pronoun = unicorn.Gender === 'Male' ? 'his' : 'her';
    displayUpdate(unicorn.Name + ', your ' + unicorn.Color + ' unicorn, is on ' + pronoun + ' way.');
    animateArrival(function animateCallback() {
        displayUpdate(unicorn.Name + ' has arrived. Giddy up!');
        WildRydes.map.unsetLocation();
        $('#request').prop('disabled', 'disabled');
        $('#request').text('Set Pickup');
    });
}