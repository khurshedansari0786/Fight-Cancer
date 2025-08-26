require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");

const app = express();
app.use(cors());  

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Models
const Register = require("./models/Register");
const Contact = require("./models/Contact");
const Donation = require("./models/Donation");
const { register } = require('module');

// Middleware
                     
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Register Route
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

     const existingUser = await Register.findOne({ email });
     if (existingUser) {
      return res.status(400).json({ message: "User already exists try another emails!" });
    }
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

    // Payment link generate

    const upiId = process.env.UPI_ID;
    const paymentLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(donorName)}&am=${donationAmount}&cu=INR`;

    res.status(200).json({
      success: true,
      paymentLink
    });

  } catch (err) {
    console.error("Donation Error:", err);
    res.status(500).send("Donation Failed");
  }
});


// Get all donations
app.get("/api/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }); // latest first
    res.json(donations);
  } catch (err) {
    console.error("Error fetching donations:", err);
    res.status(500).json({ message: "Failed to fetch donations" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,"0.0.0.0", () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
