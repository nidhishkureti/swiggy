We will implement **only Level-1: Check Seat Availability** using **very basic Node.js + Express**.
No database, no advanced concepts — just **simple memory storage**.

I will explain **every step from start → run → API call**.

---

# 1️⃣ What We Are Building

Endpoint:

```
GET /seats/{seatId}
```

Example request

```
GET /seats/A10
```

Example response

```json
{
  "seat_id": "A10",
  "available": true
}
```

---

# 2️⃣ Seat Layout

The theatre has:

```
A1 → A20
B1 → B20
```

Total seats = **40**

All seats start as:

```
available = true
```

---

# 3️⃣ Step 1 — Install Node.js

Check if Node is installed.

Open terminal and run:

```bash
node -v
```

If it prints version → Node installed.

Example

```
v18.17.0
```

---

# 4️⃣ Step 2 — Create Project Folder

Create folder

```bash
mkdir dhurandhar-ticket-api
```

Go inside folder

```bash
cd dhurandhar-ticket-api
```

---

# 5️⃣ Step 3 — Initialize Node Project

Run

```bash
npm init -y
```

This creates

```
package.json
```

---

# 6️⃣ Step 4 — Install Express

Express helps create APIs easily.

Run:

```bash
npm install express
```

This installs the library.

---

# 7️⃣ Step 5 — Create Server File

Create file

```
server.js
```

---

# 8️⃣ Complete Beginner Code

Write this code inside **server.js**

```javascript
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

app.get("/seats/:seatId", function(req, res) {

    // get seatId from URL
    let seatId = req.params.seatId;



    // check if seat exists
    if(seats[seatId] === undefined){

        return res.status(404).json({
            message: "Seat not found"
        });

    }


    // send response
    res.json({

        seat_id: seatId,
        available: seats[seatId]

    });

});



// ------------------------------------
// STEP 4: start server
// ------------------------------------

app.listen(PORT, function(){

    console.log("Server running on port " + PORT);

});
```

---

# 9️⃣ Code Logic Explained (Very Simple)

### Step 1 — Import express

```
const express = require("express");
```

We load the express library.

---

### Step 2 — Create server

```
const app = express();
```

This creates the API server.

---

### Step 3 — Seat storage

```
let seats = {};
```

Example structure

```
{
 A1: true,
 A2: true,
 A3: true,
 ...
 B20: true
}
```

---

### Step 4 — Create A seats

```
for (let i = 1; i <= 20; i++)
```

Loop runs

```
1 → 20
```

Creates

```
A1
A2
A3
...
A20
```

---

### Step 5 — Create B seats

Same logic creates

```
B1
B2
...
B20
```

---

### Step 6 — Create API endpoint

```
app.get("/seats/:seatId")
```

`:seatId` means dynamic value.

Examples

```
/seats/A10
/seats/B5
```

---

### Step 7 — Get seatId from request

```
let seatId = req.params.seatId;
```

If request

```
GET /seats/A10
```

Then

```
seatId = "A10"
```

---

### Step 8 — Check seat exists

```
if(seats[seatId] === undefined)
```

If someone calls

```
GET /seats/C10
```

Seat doesn't exist → return error.

---

### Step 9 — Send response

```
res.json({
 seat_id: seatId,
 available: seats[seatId]
});
```

Example response

```json
{
  "seat_id": "A10",
  "available": true
}
```

---

# 🔟 Run the Server

Run this command

```
node server.js
```

Output

```
Server running on port 3000
```

---

# 1️⃣1️⃣ Test API

Open browser or Postman

Call

```
http://localhost:3000/seats/A10
```

Response

```json
{
  "seat_id": "A10",
  "available": true
}
```

---

# 1️⃣2️⃣ Test Invalid Seat

Call

```
http://localhost:3000/seats/C10
```

Response

```json
{
 "message": "Seat not found"
}
```

---

# ✅ Level-1 Completed

We implemented

```
GET /seats/{seatId}
```

Seat availability check.

---

Next we will implement **Level-2 (Booking API)** which becomes **more interesting and interview level**:

```
POST /book
```

Features:

* Book seat
* Prevent double booking
* Handle race condition

If you want, I can show the **interview-level solution used in companies (with locking + concurrency)**.
