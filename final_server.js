const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

let seats = {};

for (let i = 1; i <= 20; i++) {
	let seatId = "A" + i;
	seats[seatId] = true;
}

for (let i = 1; i <= 20; i++) {
	let seatId = "B" + i;
	seats[seatId] = true;
}

let bookings = {};
let bookingCounter = 100;
let seat_lock = {};
// level 1 check seat availability 
app.get("/seats/:seatId", function (req, res) {
	let seatId = req.params.seatId;

	if (seats[seatId] === undefined) {
		return res.status(404).json({
			message: "Seat not exists",
		});
	}
	res.json({
		seat_id: seatId,
		available: seats[seatId],
	});
});

// level 2 book seat with payment processing and seat locking

app.post("/book", function (req, res) {
	let user = req.body.user;
	let seatId = req.body.seat_id;
	let payment = req.body.payment;
0

	if (seats[seatId] === undefined) {
		return res.status(404).json({
			message: "Seat does not exist",
		});
	}
	if (seats[seatId] === false) {
		return res.status(400).json({
			message: "Seat already booked",
		});
	}
	if (seat_lock[seatId] === true) {
		return res.status(400).json({
			message: "Seat is currently being booked by another user",
		});
	}
	seat_lock[seatId] = true;
	seats[seatId] = false;
	bookingCounter++;
	let bookingId = "B" + bookingCounter;
	bookings[bookingId] = {
		user: user,

		seat_id: seatId,
	};
	seat_lock[seatId] = false;
	res.json({
		booking_id: bookingId,
		seat_id: seatId,
		status: "CONFIRMED",
	});
});

app.listen(PORT, function () {
	console.log("Server running on port " + PORT);
});