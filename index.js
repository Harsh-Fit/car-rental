const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Car = require("./db/Car");
const Booking = require("./db/Booking");
const Driver = require("./db/Driver");
const Hotel = require("./db/Hotel");
const Jwt = require("jsonwebtoken");
const Final = require("./db/Final");

const jwtKey = "e-comm";

const app = express();

app.use(express.json());

app.use(cors());

app.post("/register", async (req, resp) => {
  // resp.send(req.body);
  console.log(req.body);
  const user = new User(req.body);
  let found = await User.findOne({ email: req.body.email });
  if (found) {
    resp.send(false);
  } else {
    let result = await user.save();
    // Delete password (HIDE PASSWORD while register)
    result = result.toObject();
    delete result.password;
    // resp.send(result);
    Jwt.sign({ user }, jwtKey, (err, token) => {
      if (err) {
        resp.send({
          result: "Something went wrong, Please try after sometime",
        });
      } else {
        resp.send({ result, auth: token });
      }
    });
  }
});

app.post("/login", async (req, resp) => {
  // console.log(req.body);
  // Display User if available and hide/avoid password to display
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, (err, token) => {
        if (err) {
          resp.send({
            result: "Something went wrong, Please try after sometime",
          });
        } else {
          resp.send({ user, auth: token });
        }
      });
      // resp.send(user);
    } else {
      resp.send({ result: "NO USER FOUND" });
    }
  } else {
    resp.send({ result: "NO USER FOUND" });
  }
});

app.get("/user/:email", async (req, resp) => {
  let user = await User.findOne({ email: req.params.email });
  if (user.length) {
    resp.send(user);
  } else {
    resp.send({ result: "No User Found" });
  }
});

app.post("/add-cars", async (req, resp) => {
  // resp.send(req.body);
  // console.log(req.body);
  const car = new Car(req.body);
  let result = await car.save();
  // result = result.toObject();
  // delete result.password;
  resp.send(result);
});

app.get("/cars", async (req, resp) => {
  let car = await Car.find();
  if (car.length) {
    resp.send(car);
  } else {
    resp.send({ result: "No Car Found" });
  }
});

app.get("/book-car/:id", async (req, resp) => {
  const result = await Car.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Car Found !!!" });
  }
});

app.post("/book-now", async (req, resp) => {
  // resp.send(req.body);
  // console.log(req.body);
  const details = new Booking(req.body);
  let result = await details.save();
  // result = result.toObject();
  // delete result.password;
  resp.send(result);
});

app.post("/add-drivers", async (req, resp) => {
  // resp.send(req.body);
  // console.log(req.body);
  const car = new Driver(req.body);
  let result = await car.save();
  // result = result.toObject();
  // delete result.password;
  resp.send(result);
});

app.get("/drivers", async (req, resp) => {
  let car = await Driver.find();
  if (car.length) {
    resp.send(car);
  } else {
    resp.send({ result: "No Driver Found" });
  }
});

app.get("/book-driver/:id", async (req, resp) => {
  const result = await Driver.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Driver Found !!!" });
  }
});

app.post("/driver-hotel", async (req, resp) => {
  // resp.send(req.body);
  // console.log(req.body);
  const car = new Hotel(req.body);
  let result = await car.save();
  // result = result.toObject();
  // delete result.password;
  resp.send(result);
});

app.post("/finalConfirm", verifyToken, async (req, resp) => {
  const finalTicket = new Final(req.body);
  let result = await finalTicket.save();
  console.log(result);
  resp.send(result);
});

app.get("/ticket-details/:email", async (req, resp) => {
  const result = await Final.find({ email: req.params.email });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "NO RECORD FOUND !!!" });
  }
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    // console.warn("Middleware Called", token);
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with headers" });
  }
  // next();
}
app.listen(5000);
