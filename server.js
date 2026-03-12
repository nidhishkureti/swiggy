// import express library
const express = require("express");

// create express app
const app = express();

// server port
const PORT = 3000;

// ------------------------------------
// STEP 1: create seat storage
// ------------------------------------

// we use a simple object to store seats
// key = seat id
// value = availability

let seats = {};

// ------------------------------------
// STEP 2: initialize seats
// ------------------------------------

// create seats A1 - A20
for (let i = 1; i <= 20; i++) {
	// create seat name
	let seatId = "A" + i;

	// mark seat available
	seats[seatId] = true;
}

// create seats B1 - B20
for (let i = 1; i <= 20; i++) {
	let seatId = "B" + i;

	seats[seatId] = true;
}

// ------------------------------------
// STEP 3: API to check seat availability
// ------------------------------------

app.get("/seats/:seatId", function (req, res) {
	// get seatId from URL
	let seatId = req.params.seatId;

	// check if seat exists
	if (seats[seatId] === undefined) {
		return res.status(404).json({
			message: "Seat not found",
		});
	}

	// send response
	res.json({
		seat_id: seatId,
		available: seats[seatId],
	});
	// response Sent by this server.js when they call get /seats/:seatID
    //  here seatID will be replaced for example we need to check for the A10
    // it will output this 
    
	// {
    //   "seat_id": "A10",
    //   "available": true
    // }
    
    
    
    
});

// ------------------------------------
// STEP 4: start server
// ------------------------------------

app.listen(PORT, function () {
	console.log("Server running on port " + PORT);
});
