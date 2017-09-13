
// // =======
// var config = {
//     apiKey: "AIzaSyCtZ5Ob4IWwqG5UbqHESm1_sCjQaypfexs",
//     authDomain: "assetiq-4d15d.firebaseapp.com",
//     databaseURL: "https://assetiq-4d15d.firebaseio.com",
//     projectId: "assetiq-4d15d",
//     storageBucket: "assetiq-4d15d.appspot.com",
//     messagingSenderId: "300194767147"

// };

// firebase.initializeApp(config);

// REMOVED FIREBASE INITIALIZATION FROM PEOPLE.JS SINCE THERE NOW EXISTS FIREBASEINIT.JS
// REFERENCED ON ALL HTML PAGES - MKC

$(document).ready(function() {

// Firebase
var firstName, lastName, name, position, department, email, address, phone, assetID;

// Button for adding new employee
$("#input-user").on("click", function() {
    // Grab user input
    firstName = $("#first-name").val().trim();
    lastName =  $("#last-name").val().trim();
    name =      firstName + " " + lastName;
    position =  $("#position").val().trim();
    department = $("#dept").val().trim();
    email = $("#email").val().trim();
    address = $("#home").val().trim();
    phone = $("#phone").val().trim();
    assetID = $("#asset-id").val().trim();

    // Create local object to hold employee data
    var newEmployee = {
        name: name,
        position: position,
        department: department,
        email: email,
        address: address,
        phone: phone,
        assetID: assetID,
        created: firebase.database.ServerValue.TIMESTAMP
    };

    console.log(newEmployee.name);

    // Upload employee data to database
    firebase.database().ref().push(newEmployee);

    // Clear input fields
    $("#first-name").val("");
    $("#last-name").val("");
    $("#position").val("");
    $("#dept").val("");
    $("#email").val("");
    $("#home").val("");
    $("#phone").val("");
    $("#asset-id").val("");
});

firebase.database().ref().on("child_added", function(childSnapshot, prevChildKey) {

    // Create local variables from child object
    name = childSnapshot.val().name;
    position = childSnapshot.val().position;
    department = childSnapshot.val().department;
    email = childSnapshot.val().email;
    address = childSnapshot.val().address;
    phone = childSnapshot.val().phone;
    assetID = childSnapshot.val().assetID;

    $("#people-table > tbody").append("<tr><td>" + name + "</td><td>" + position + "</td><td>" +
        department + "</td><td>" + email + "</td><td>" + address + "</td><td>" + phone + "</td><td>" + assetID + "</td></tr>");

});

// Logout Button
$("#logout-button").on("click", function() {
    event.preventDefault();
    // var currentUser = Parse.User.current();
        // if (currentUser) {
        //     Parse.User.logout();
        //     window.location="Sign_In.html";
        // } else {
            window.location = "index.html";
});

});