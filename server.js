require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// MongoDB Connection......

// mongoose.connect("mongodb://127.0.0.1:27017/suportSystem")
//   .then(() => {
//     console.log("MongoDB Connected");
   
//   })
//   .catch(err => console.error("MongoDB Error:", err));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Models
const Register = require("./models/Register");
const Contact = require("./models/Contact");
const Donation = require("./models/Donation");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Register Route
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await Register.create({ name, email, password });
   res.status(200).json({ message: 'Registration Successfully!'});
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).send("Registration Failed");
  }
});

// Contact Route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
   res.status(200).json({ message: 'Contact form Submitted!' });
  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).send("Contact Submission Failed");
  }
});


// Donation Route
app.post("/api/donation", async (req, res) => {
  try {
    const { donorName, donationAmount, donationMessage } = req.body;

    await Donation.create({ donorName, donationAmount, donationMessage });

    // ✅ Payment link generate
    const upiID = "khurshedansari12403@okhdfcbank"; // apna UPI ID dalen
    const paymentLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(donorName)}&am=${donationAmount}&cu=INR`;

    res.status(200).json({
      success: true,
      paymentLink
    });

  } catch (err) {
    console.error("Donation Error:", err);
    res.status(500).send("Donation Failed");
  }
});


// Server Listen
app.listen(3000, () => {
  console.log(`server listening at http://localhost:3000`);
});
