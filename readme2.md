We will now implement **Level-2: Book Ticket API** using the **same simple Node.js + Express server**.

We will keep everything **very beginner-friendly**:

* No database
* No advanced libraries
* Just **basic objects, if conditions, and simple logic**

---

# 1️⃣ What This API Should Do

Endpoint

```text
POST /book
```

Request Example

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

Steps the system performs:

1. Check if seat exists
2. Check if seat is available
3. Process payment (simulate payment success)
4. Mark seat as booked
5. Return booking confirmation

Response Example

```json
{
  "booking_id": "B101",
  "seat_id": "A10",
  "status": "CONFIRMED"
}
```

---

# 2️⃣ Update the Server

We will modify the **same `server.js` file**.

---

# 3️⃣ Add JSON Middleware

Add this line **after creating the app**

```javascript
app.use(express.json());
```

This allows the server to **read JSON request bodies**.

---

# 4️⃣ Add Booking Storage

Add this after seat initialization.

```javascript
// store bookings
let bookings = {};

// booking counter
let bookingCounter = 100;
```

Example structure

```text
bookings = {
 B101 : { user:"rahul", seat:"A10" }
}
```

---

# 5️⃣ Book Ticket API

Add this **below the seat availability API**.

```javascript
// ------------------------------------
// BOOK TICKET API
// ------------------------------------

app.post("/book", function(req, res){

    // get data from request body
    let user = req.body.user;
    let seatId = req.body.seat_id;
    let payment = req.body.payment;

    // check if seat exists
    if(seats[seatId] === undefined){
        return res.status(404).json({
            message: "Seat does not exist"
        });
    }

    // check seat availability
    if(seats[seatId] === false){
        return res.status(400).json({
            message: "Seat already booked"
        });
    }

    // simulate payment processing
    if(payment == null){
        return res.status(400).json({
            message: "Payment details missing"
        });
    }

    // assume payment success
    let paymentSuccess = true;

    if(!paymentSuccess){
        return res.status(400).json({
            message: "Payment failed"
        });
    }

    // mark seat as booked
    seats[seatId] = false;

    // generate booking id
    bookingCounter = bookingCounter + 1;
    let bookingId = "B" + bookingCounter;

    // store booking
    bookings[bookingId] = {
        user: user,
        seat_id: seatId
    };

    // send response
    res.json({
        booking_id: bookingId,
        seat_id: seatId,
        status: "CONFIRMED"
    });

});
```

---

# 6️⃣ Complete Flow of Booking

Example request

```json
POST /book

{
  "user": "rahul",
  "seat_id": "A10",
  "payment": {
    "payment_mode": "UPI",
    "upi_id": "rahul@upi"
  }
}
```

---

### Step 1 — Get Request Data

```javascript
let user = req.body.user;
let seatId = req.body.seat_id;
```

Now

```text
user = rahul
seatId = A10
```

---

### Step 2 — Check Seat Exists

```javascript
if(seats[seatId] === undefined)
```

If seat not present → error.

---

### Step 3 — Check Seat Available

```javascript
if(seats[seatId] === false)
```

If already booked → return error.

---

### Step 4 — Process Payment

We simulate success

```javascript
let paymentSuccess = true;
```

---

### Step 5 — Mark Seat Booked

```javascript
seats[seatId] = false;
```

Now

```text
A10 → booked
```

---

### Step 6 — Generate Booking ID

```javascript
bookingCounter++
```

Example

```text
B101
```

---

### Step 7 — Save Booking

```javascript
bookings[bookingId] = {
 user: "rahul",
 seat_id: "A10"
}
```

---

### Step 8 — Send Response

```json
{
  "booking_id": "B101",
  "seat_id": "A10",
  "status": "CONFIRMED"
}
```

---

# 7️⃣ Run the Server

```bash
node server.js
```

---

# 8️⃣ Test API Using Postman

POST request

```text
http://localhost:3000/book
```

Body

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

---

# 9️⃣ Test Double Booking

If another user tries:

```json
{
  "user": "amit",
  "seat_id": "A10",
  "payment": {
    "payment_mode": "UPI",
    "upi_id": "amit@upi"
  }
}
```

Response

```json
{
  "message": "Seat already booked"
}
```

---

# ✅ Level-2 Completed

We implemented:

```text
POST /book
```

With:

* seat validation
* payment simulation
* booking id generation
* seat locking

---

If this was a **real backend interview question**, the **next level (very important)** would be:

**Concurrency Problem**

Two users booking same seat simultaneously.

Example

```text
Rahul → books A10
Amit → books A10 at same time
```

Without locking → **both may succeed**

Companies expect solutions like

* mutex lock
* distributed lock (Redis)
* database transaction

If you want, I can show the **Google / Uber level solution for this problem**.
