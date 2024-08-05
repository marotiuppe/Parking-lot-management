const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
// Initialize the database
db.serialize(() => {
  db.run("CREATE TABLE parking_slots (id INTEGER PRIMARY KEY, status TEXT)");
  for (let i = 1; i <= 100; i++) {
    db.run("INSERT INTO parking_slots (status) VALUES ('available')");
  }
});

// Book a parking slot
function bookSlot(vehicleNumber, parkingSlot,name,mobileNumber) {
  return new Promise((resolve, reject) => {
    db.get("SELECT status FROM parking_slots WHERE id = ?", [parkingSlot], (err, row) => {
      if (err) return reject(err);
      if (row && row.status === 'available') {
        db.run("UPDATE parking_slots SET status = ? WHERE id = ?", [`booked by ${name} | ${mobileNumber} | ${vehicleNumber}`, parkingSlot], function(err) {
          if (err) return reject(err);
          resolve();
        });
      } else {
        reject(new Error('Slot not available'));
      }
    });
  });
}

// Get all available slots
function getAvailableSlots() {
  return new Promise((resolve, reject) => {
    db.all("SELECT id, status FROM parking_slots", (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = { bookSlot, getAvailableSlots };
