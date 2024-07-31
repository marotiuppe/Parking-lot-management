const express = require('express');
const router = express.Router();
const { bookSlot, getAvailableSlots } = require('../models/parking');

router.post('/book-slot', (req, res) => {
  const { vehicleNumber, parkingSlot,name,mobileNumber } = req.body;
  bookSlot(vehicleNumber, parkingSlot,name,mobileNumber)
    .then(() => {
      res.json({ message: `Slot ${parkingSlot} booked for ${name} | ${mobileNumber} | vehicle No ${vehicleNumber}` });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get('/available-slots', (req, res) => {
  getAvailableSlots()
    .then(slots => {
      res.json({ slots });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
