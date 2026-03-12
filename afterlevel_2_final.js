// import express
const express = require("express");

// create app
const app = express();

// server port
const PORT = 3000;

// allow json body
app.use(express.json());

// ----------------------------
// STEP 1 : Seat Storage
// ----------------------------

let seats = {};

// create seats A1-A20
for (let i = 1; i <= 20; i++) {
	let seatId = "A" + i;

	seats[seatId] = true;
}

// create seats B1-B20
for (let i = 1; i <= 20; i++) {
	let seatId = "B" + i;

	seats[seatId] = true;
}

// ----------------------------
// STEP 2 : Booking Storage
// ----------------------------

let bookings = {};

let bookingCounter = 100;

// ----------------------------
// STEP 3 : Seat Locks
// ----------------------------

let seatLocks = {};

// ----------------------------
// STEP 4 : Check Seat API
// ----------------------------

app.get("/seats/:seatId", function (req, res) {
	let seatId = req.params.seatId;

	if (seats[seatId] === undefined) {
		return res.status(404).json({
			message: "Seat not found",
		});
	}

	res.json({
		seat_id: seatId,
		available: seats[seatId],
	});
});

// ----------------------------
// STEP 5 : Simulate Payment
// ----------------------------

function processPayment(payment) {
	// simulate payment failure randomly

	let randomNumber = Math.random();

	if (randomNumber < 0.3) {
		return false; // payment failed
	}

	return true; // payment success
}

// ----------------------------
// STEP 6 : Book Ticket
// ----------------------------

app.post("/book", function (req, res) {
	let user = req.body.user;

	let seatId = req.body.seat_id;

	let payment = req.body.payment;

	// check seat exists
	if (seats[seatId] === undefined) {
		return res.status(404).json({
			message: "Seat does not exist",
		});
	}

	// check if seat already booked
	if (seats[seatId] === false) {
		return res.status(400).json({
			message: "Seat already booked",
		});
	}

	// check if seat locked
	if (seatLocks[seatId] === true) {
		return res.status(400).json({
			message: "Seat is currently being booked by another user",
		});
	}

	// lock seat
	seatLocks[seatId] = true;

	// process payment
	let paymentSuccess = processPayment(payment);

	// if payment failed
	if (!paymentSuccess) {
		// unlock seat
		seatLocks[seatId] = false;

		return res.status(400).json({
			message: "Payment failed. Seat still available.",
		});
	}

	// mark seat booked
	seats[seatId] = false;

	// generate booking id
	bookingCounter++;

	let bookingId = "B" + bookingCounter;

	// save booking
	bookings[bookingId] = {
		user: user,

		seat_id: seatId,
	};

	// unlock seat
	seatLocks[seatId] = false;

	// send success response
	res.json({
		booking_id: bookingId,

		seat_id: seatId,

		status: "CONFIRMED",
	});
});

// ----------------------------
// STEP 7 : Start Server
// ----------------------------

app.listen(PORT, function () {
	console.log("Server running on port " + PORT);
});
