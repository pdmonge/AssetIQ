// AssetIQ
// Code for index.html


$(document).ready(function() {
  // Login function
  $('#login-button-submit').click(function(event) {
    event.preventDefault();

    $('#auth-message').empty();

    // Get Login email address and password
    var email = $('#login-input-email').val().trim();
    var password = $('#login-input-password').val().trim();

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (user) {
      window.location = 'people.html';
    })
    .catch(function(error) {
      // Handle Errors here.
      $('#auth-message').text(error.message);
    });

    

    console.log(firebase.UserInfo);
  });
});