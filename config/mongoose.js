const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/auth');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error in comnecting to the database"));

db.once('open', function () {
    console.log("sucessfully conected to the database");
});