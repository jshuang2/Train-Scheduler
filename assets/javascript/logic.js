// 1. Configure firebase with our application
var config = {
    apiKey: "AIzaSyBuFN_iZX5YoJR2WpMTVGU56g5YPW8MScs",
    authDomain: "train-scheduler-dfc7b.firebaseapp.com",
    databaseURL: "https://train-scheduler-dfc7b.firebaseio.com",
    projectId: "train-scheduler-dfc7b",
    storageBucket: "train-scheduler-dfc7b.appspot.com",
    messagingSenderId: "982111725743",
    appId: "1:982111725743:web:3056a3ea7a2e2fcbec4c5a"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
// 3. Grab user input
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

// 4. Create variable object to hold train data
    var newTrainForm = {
        train: trainName,
        destination: destinationName,
        firstTrain: firstTrain,
        frequency: frequency
    };


// 5. Upload train data to the database
    database.ref().push(newTrainForm);
    console.log(newTrainForm.train);
    console.log(newTrainForm.destination);
    console.log(newTrainForm.firstTrain);
    console.log(newTrainForm.frequency);

// 6. Clear form input fields
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});


// 7. Append each child from our database into the table with a new row
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var destinationName = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destinationName);
    console.log(firstTrain);
    console.log(frequency);

    // First train arrival pushed back 1 year to make sure it is before the current time
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times in minutes
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var timeRemainder = diffTime % frequency;
    console.log(timeRemainder);

    // Minute Until Train
    var minutesTillTrain = frequency - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));





})