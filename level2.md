Now we upgrade the previous API to handle **advanced cases**:

1️⃣ **Payment Failure Simulation**
2️⃣ **Seat Blocking (prevent multiple users booking the same seat at the same time)**

We will still keep the code **very simple and beginner friendly**.

---

# 1️⃣ Idea of the Advanced Features

### Payment Failure

When booking happens:

```
Check seat → Process payment → Book seat
```

If payment **fails**

```
Seat must stay available
```

---

### Seat Blocking (Concurrency Protection)

Problem example

```
Rahul tries to book A10
Amit tries to book A10 at the same time
```

Without protection:

```
Both may book the seat
```

Solution:

We create a **seat lock system**

```
seatLocks = {}
```

When someone starts booking

```
lock seat
```

After booking finishes

```
unlock seat
```

---

# 2️⃣ Project Setup

Same as before.

```
mkdir dhurandhar-ticket-api
cd dhurandhar-ticket-api
npm init -y
npm install express
```

Create file

```
server.js
```

---

# 3️⃣ Full Updated Code (Beginner Friendly)

```javascript
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



// ----------------------------
// STEP 5 : Simulate Payment
// ----------------------------

function processPayment(payment){

    // simulate payment failure randomly

    let randomNumber = Math.random();

    if(randomNumber < 0.3){

        return false; // payment failed

    }

    return true; // payment success
}



// ----------------------------
// STEP 6 : Book Ticket
// ----------------------------

app.post("/book", function(req, res){

    let user = req.body.user;

    let seatId = req.body.seat_id;

    let payment = req.body.payment;



    // check seat exists
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



    // check if seat locked
    if(seatLocks[seatId] === true){

        return res.status(400).json({
            message: "Seat is currently being booked by another user"
        });

    }



    // lock seat
    seatLocks[seatId] = true;



    // process payment
    let paymentSuccess = processPayment(payment);



    // if payment failed
    if(!paymentSuccess){

        // unlock seat
        seatLocks[seatId] = false;

        return res.status(400).json({
            message: "Payment failed. Seat still available."
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

        seat_id: seatId

    };



    // unlock seat
    seatLocks[seatId] = false;



    // send success response
    res.json({

        booking_id: bookingId,

        seat_id: seatId,

        status: "CONFIRMED"

    });

});



// ----------------------------
// STEP 7 : Start Server
// ----------------------------

app.listen(PORT, function(){

    console.log("Server running on port " + PORT);

});
```

---

# 4️⃣ How Seat Blocking Works

Example scenario

```
User1 → book A10
User2 → book A10
```

User1 request arrives first

```
seatLocks[A10] = true
```

User2 request arrives

```
seatLocks[A10] already true
```

Response

```
Seat is currently being booked by another user
```

So **only one booking succeeds**.

---

# 5️⃣ Payment Failure Example

Sometimes payment fails randomly.

Response

```json
{
 "message": "Payment failed. Seat still available."
}
```

Seat remains

```
available = true
```

---

# 6️⃣ Successful Booking Example

Request

```json
{
 "user": "rahul",
 "seat_id": "A10",
 "payment": {
   "payment_mode": "UPI",
   "upi_id": "rahul@upi"
 }
}
```

Response

```json
{
 "booking_id": "B101",
 "seat_id": "A10",
 "status": "CONFIRMED"
}
```

Seat now

```
A10 → booked
```

---

# 7️⃣ Why This Version is Better

Now the system handles:

✅ Payment failures
✅ Seat locking
✅ Prevents double booking
✅ Booking storage
✅ API validation

---

⭐ **Very important interview question**

The interviewer may ask:

> Why is this seat locking still not perfect?

Answer:

Because this lock works **only in one server instance**.

If we have **multiple servers**, we need:

```
Redis distributed locks
Database transactions
```

---

If you want, I can also show the **Uber / BookMyShow real architecture for ticket booking systems** (very interesting and commonly asked in backend interviews).
