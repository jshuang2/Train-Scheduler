//1. Configure firebase with our application
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

//2. Button for adding trains
//3. Grab user input
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

//4. Create variable object to hold train data
    var newTrainForm = {
        train: trainName,
        destination: destinationName,
        firstTrain: firstTrain,
        frequency: frequency
    };


//5. Upload train data to the database
    database.ref().push(newTrainForm);
    console.log(newTrainForm.train);
    console.log(newTrainForm.destination);
    console.log(newTrainForm.firstTrain);
    console.log(newTrainForm.frequency);
});

//6. Clear text boxes

//7. 