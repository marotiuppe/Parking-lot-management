document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('parking-form');
    const messageDiv = document.getElementById('message');
    const slotsList = document.getElementById('slots-list');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const vehicleNumber = document.getElementById('vehicle-number').value;
      const parkingSlot = document.getElementById('parking-slot').value;
      const name = document.getElementById('name').value;
      const mobileNumber = document.getElementById('mobile-number').value;
  
      fetch('/api/book-slot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vehicleNumber, parkingSlot,name,mobileNumber })
      })
      .then(response => response.json())
      .then(data => {
        messageDiv.innerText = data.message;
        loadAvailableSlots();
      })
      .catch(error => console.error('Error:', error));
    });
  
    function loadAvailableSlots() {
      fetch('/api/available-slots')
        .then(response => response.json())
        .then(data => {
          slotsList.innerHTML = '';
          data.slots.forEach(slot => {
            const li = document.createElement('li');
            li.innerText = `Slot ${slot.id}: ${slot.status} `;
            slotsList.appendChild(li);
          });
        })
        .catch(error => console.error('Error:', error));
    }
  
    loadAvailableSlots();
  });
  