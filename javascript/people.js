var config = {
    apiKey: "AIzaSyCtZ5Ob4IWwqG5UbqHESm1_sCjQaypfexs",
    authDomain: "assetiq-4d15d.firebaseapp.com",
    databaseURL: "https://assetiq-4d15d.firebaseio.com",
    projectId: "assetiq-4d15d",
    storageBucket: "assetiq-4d15d.appspot.com",
    messagingSenderId: "300194767147"

};

firebase.initializeApp(config);

var firstName, lastName, name, position, department, email, address, phone, assetID;

// Button for adding train data
$("#inputUser").on("click", function() {
    // Grab user input
    firstName = $("#first_name").val().trim();
    lastName = $("#last_name").val().trim();
    name = firstName + " " + lastName;
    position = $("#position").val().trim();
    department = $("#dept").val().trim();
    email = $("#email").val().trim();
    address = $("#home").val().trim();
    phone = $("#phone").val().trim();
    assetID = $("#assetID").val().trim();

    // Create local object to hold train data
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

    // Upload train data to database
    firebase.database().ref().push(newEmployee);

    // Clear input fields
    $("#first_name").val("");
    $("#last_name").val("");
    $("#position").val("");
    $("#dept").val("");
    $("#email").val("");
    $("#home").val("");
    $("#phone").val("");
    $("#assetID").val("");
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

    $("#peopleTable > tbody").append("<tr><td>" + name + "</td><td>" + position + "</td><td>" +
        department + "</td><td>" + email + "</td><td>" + address + "</td><td>" + phone + "</td><td>" + assetID + "</td></tr>");

})