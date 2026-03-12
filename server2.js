// import express library
const express = require("express");

// create express application
const app = express();

// port where server runs
const PORT = 3000;

// middleware to read JSON body
app.use(express.json());


// ---------------------------------------
// STEP 1 : Seat Storage
// ---------------------------------------

// object to store seats
// key = seat id
// value = availability
let seats = {};


// ---------------------------------------
// STEP 2 : Initialize Seats
// ---------------------------------------

// create seats A1 to A20
for (let i = 1; i <= 20; i++) {

    // create seat name
    let seatId = "A" + i;

    // mark seat available
    seats[seatId] = true;
}


// create seats B1 to B20
for (let i = 1; i <= 20; i++) {

    let seatId = "B" + i;

    seats[seatId] = true;
}



// ---------------------------------------
// STEP 3 : Booking Storage
// ---------------------------------------

let bookings = {};

// booking id counter
let bookingCounter = 100;



// ---------------------------------------
// STEP 4 : Check Seat Availability
// ---------------------------------------

app.get("/seats/:seatId", function(req, res) {

    // get seat id from URL
    let seatId = req.params.seatId;

    // check if seat exists
    if(seats[seatId] === undefined){

        return res.status(404).json({
            message: "Seat not found"
        });

    }

    // return availability
    res.json({
        seat_id: seatId,
        available: seats[seatId]
    });

});



// ---------------------------------------
// STEP 5 : Book Ticket API
// ---------------------------------------

app.post("/book", function(req, res){

    // read request body
    let user = req.body.user;
    let seatId = req.body.seat_id;
    let payment = req.body.payment;


    // check if seat exists
    if(seats[seatId] === undefined){

        return res.status(404).json({
            message: "Seat does not exist"
        });

    }


    // check if seat already booked
    if(seats[seatId] === false){

        return res.status(400).json({
            message: "Seat already booked"
        });

    }


    // check payment details
    if(payment == null){

        return res.status(400).json({
            message: "Payment details missing"
        });

    }


    // simulate payment processing
    let paymentSuccess = true;


    if(!paymentSuccess){

        return res.status(400).json({
            message: "Payment failed"
        });

    }


    // mark seat booked
    seats[seatId] = false;


    // generate booking id
    bookingCounter = bookingCounter + 1;

    let bookingId = "B" + bookingCounter;


    // store booking
    bookings[bookingId] = {
        user: user,
        seat_id: seatId
    };


    // send confirmation
    res.json({

        booking_id: bookingId,
        seat_id: seatId,
        status: "CONFIRMED"

    });

});



// ---------------------------------------
// STEP 6 : Start Server
// ---------------------------------------

app.listen(PORT, function(){

    console.log("Server running on port " + PORT);

});