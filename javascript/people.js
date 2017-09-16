//Initialize Firebase through external link

$(document).ready(function() {
  loadAssetDropdown();

  var firstName, lastName, name, position, department, email, address, phone, assetID;

  var modalValue = $("#no").val();
  var modalValue2 = $("#yes").val();

  // Button for adding new employee
  $("#input-user").on("click", function() {
    firstName = $("#first-name").val().trim();
    lastName = $("#last-name").val().trim();
    name = firstName + " " + lastName;
    position = $("#position").val().trim();
    department = $("#dept").val();
    email = $("#email").val().trim();
    address = $("#home").val().trim();
    phone = $("#phone").val().trim();
    assetID = $("#asset-id-dropdown").val().trim();
    $("#my-modal").modal();
    $(".modal-body").html("Name: " + name + "<br>" + "Position: " + position + "<br>" + "Department: " + department + "<br>" + "Email: " + email +
      "<br>" + "Address: " + address + "<br>" + "Phone: " + phone + "<br" + "AssetID: " + assetID);
  });

  $("#yes").on("click", function() {
    event.preventDefault();

    // Create local object to hold employee data
    var newEmployee = {
      name: name,
      position: position,
      department: department,
      email: email,
      address: address,
      phone: phone,
      assetID: 0,
      created: firebase.database.ServerValue.TIMESTAMP
    };

    console.log(newEmployee.name);

    // Upload employee data to database
    firebase.database().ref('employees').push(newEmployee);

    // Clear input fields
    $("#first-name").val("");
    $("#last-name").val("");
    $("#position").val("");
    $("#dept").val("");
    $("#email").val("");
    $("#home").val("");
    $("#phone").val("");
  });

  firebase.database().ref('employees').on("child_added", function(childSnapshot, prevChildKey) {
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
    firebase.auth().signOut().then(function() {
      window.location = "loggedout.html";
    });
  });
});

//auto-complete through GoogleMaps API
var placeSearch, autocomplete;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */
    (document.getElementById('home')), { types: ['geocode'] });
}


// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy

      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

var assetList = [];
function loadAssetDropdown() {
  // console.log(firebase.database().ref('assets'));

  // Get assets from the database
  var assetQuery = firebase.database().ref("assets").orderByKey();
  assetQuery.once("value")
  .then(function(assetsSnapshot) {

    // Fill the assetList array
    assetsSnapshot.forEach(function(aAssetSnapshot) {
      var assetData = aAssetSnapshot.val();
      // console.log('Asset Data: ',assetData);
      assetList.push(assetData);
    });

    // Get employees from the database and create a list of assigned assetIDs
    var assignedAssetList = [];
    var employeeQuery = firebase.database().ref("employees").orderByKey();
    employeeQuery.once("value")
    .then(function(employeesSnapshot) {

      // Create list of assigned assets
      employeesSnapshot.forEach(function(aEmployeeSnapshot) {
        var employeeData = aEmployeeSnapshot.val();
        console.log('Employee Data: ',employeeData);
        if (employeeData.assetID != '') {
          assignedAssetList.push(employeeData.assetID);
        }
      }); // employeesSnapshot.forEach

      // Remove asssigned assets from assetList
      var tempAssetList = [];
      for (var i=0,len=assetList.length; i<len; i++) {
        var currentAsset = assetList[i];

        if (assignedAssetList.indexOf(currentAsset.AssetID) === -1) {
          tempAssetList.push(currentAsset);
        }
      }
      assetList = tempAssetList;
      loadAssetDropDownFromArray();
    }); // employeeQuery.then
  }); // assetQuery.then
} // function loadAssetDropDown

// Load assetDropDown from assetList array
function loadAssetDropDownFromArray() {
  assetDropDown = $('#asset-id-dropdown');
  assetDropDown.empty();
  assetDropDown.append('<option value="" disabled selected hidden>Please Select</option>');
  for (var i = 0,len=assetList.length;i<len;i++) {
    currentAsset = assetList[i];
    var newOptionItem = $('<option>');
    console.log(newOptionItem);
    newOptionItem.attr('data-index',i);
    newOptionItem.val(currentAsset.AssetID);
    newOptionItem.text(currentAsset.AssetID+' '+currentAsset.ItemDescription[0]);
    assetDropDown.append(newOptionItem);
  }
} // function loadAssetDropDownFromArray