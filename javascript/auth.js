// FIREBASE
// Initialize Firebase
var config = {
  apiKey: "AIzaSyA3CVxnIXyQgnfPZPp1EJsMD1W0xEIGTtw",
  authDomain: "dubootcamp-group-project1.firebaseapp.com",
  databaseURL: "https://dubootcamp-group-project1.firebaseio.com",
  projectId: "dubootcamp-group-project1",
  storageBucket: "dubootcamp-group-project1.appspot.com",
  messagingSenderId: "93086047570"
};
firebase.initializeApp(config);

function validateInput() {
	return true;
}

// Login function
$('#loginButtonSubmit').click({
	// Get Login email address and password
	

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  // var errorCode = error.code;
  // var errorMessage = error.message;
  // ...
  console.log('Error: ',error.code,' ',error.message);
	});
});




document.ready(function() {


});