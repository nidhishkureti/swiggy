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

app.get("/seats/:seatId", function(req, res) {

    let seatId = req.params.seatId;
    if(seats[seatId] === undefined){
        return res.status(404).json({
            message: "Seat not found"
        });

    }
    res.json({
        seat_id: seatId,
        available: seats[seatId]
    });

});

app.post("/book", function(req, res){

    let user = req.body.user;
    let seatId = req.body.seat_id;
    let payment = req.body.payment;

    if(seats[seatId] === undefined){
        return res.status(404).json({
            message: "Seat does not exist"
        });

    }
    if(seats[seatId] === false){

        return res.status(400).json({
            message: "Seat already booked"
        });
    }

    if(payment == null){
        return res.status(400).json({
            message: "Payment details missing"
        });

    }
    let paymentSuccess = true;
    if(!paymentSuccess){
        return res.status(400).json({
            message: "Payment failed"
        });

    }
    seats[seatId] = false;
    bookingCounter = bookingCounter + 1;
    let bookingId = "B" + bookingCounter;

    bookings[bookingId] = {
        user: user,
        seat_id: seatId
    };

    res.json({
        booking_id: bookingId,
        seat_id: seatId,
        status: "CONFIRMED"

    });

});

app.listen(PORT, function(){
    console.log("Server running on port " + PORT);

});