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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
