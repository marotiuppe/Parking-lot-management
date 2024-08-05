document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('parking-form');
  const successMessage = document.getElementById('success-message');
  const parkinglot = document.getElementById('parking-lot');
  const parkingSlotInput = document.getElementById('parking-slot');
  const errorMessage = document.getElementById('error-message'); // Assuming you have an error div in your HTML  

  parkingSlotInput.addEventListener('input', function() {
    const enteredValue = Number(parkingSlotInput.value);
    // Check if the entered value exceeds the maximum slot value  
    if (enteredValue > maxSlotValue) {  
      errorMessage.innerHTML = "entered value exceeds the maximum slot value : "+enteredValue; // Show error message  
      parkingSlotInput.value = ''; // Clear the input  
    } 
});

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
      body: JSON.stringify({ vehicleNumber, parkingSlot, name, mobileNumber })  
    })  
    .then(response => response.json())  
    .then(data => {  
      successMessage.innerText = data.message;  

      // Clear input fields after successful submission  
      document.getElementById('vehicle-number').value = '';  
      document.getElementById('parking-slot').value = '';  
      document.getElementById('name').value = '';  
      document.getElementById('mobile-number').value = '';  
      
      loadAvailableSlots(); // Assuming this function is defined elsewhere  
    })  
    .catch(error => console.error('Error:', error));  
  });

  function loadAvailableSlots() {
    fetch('/api/available-slots')
      .then(response => response.json())
      .then(data => {
          parkinglot.innerHTML='';
          data.slots.forEach(slot => {  
            const div = document.createElement('div');  
            
            div.setAttribute('data-slot-id', `${slot.id}`);  
            div.innerText = `${slot.id}`;  
            div.value = `${slot.id}`;  
            const span = document.createElement('span');   
            span.className = 'tooltiptext';  
            span.innerText = `${slot.status}`;  
            
            // Set class based on status  
            if (slot.status.includes("available")) {  
                div.className = 'slot available tooltip';  
            } else if (slot.status.includes("booked")) {  
                div.className = 'slot booked tooltip'; // Change class name to 'booked' for clarity  
            }  
            
            div.appendChild(span);  
            
            // Add click event listener  
            div.addEventListener('click', function (event) {  
                if (this.classList.contains('available')) {  
                    // Remove 'selected' class from any currently selected slot  
                    const currentlySelected = document.querySelector('.slot.selected');  
                    if (currentlySelected) {  
                        currentlySelected.classList.remove('selected');   
                    }  
        
                    // Toggle the selected class for the clicked slot  
                    this.classList.add('selected'); // Add selected class to this slot  
        
                    // Update the input field for the selected slot  
                    document.getElementById('parking-slot').value = this.value;   
                }   
                // If it's booked, do nothing or provide feedback  
            });  
            parkinglot.appendChild(div);  
        });
      })
      .catch(error => console.error('Error:', error));
  }

  loadAvailableSlots();
});