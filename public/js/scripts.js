// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('parking-form');
//     const messageDiv = document.getElementById('message');
//     const slotsList = document.getElementById('slots-list');
  
//     form.addEventListener('submit', function(event) {
//       event.preventDefault();
      
//       const vehicleNumber = document.getElementById('vehicle-number').value;
//       const parkingSlot = document.getElementById('parking-slot').value;
//       const name = document.getElementById('name').value;
//       const mobileNumber = document.getElementById('mobile-number').value;
  
//       fetch('/api/book-slot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ vehicleNumber, parkingSlot,name,mobileNumber })
//       })
//       .then(response => response.json())
//       .then(data => {
//         messageDiv.innerText = data.message;
//         loadAvailableSlots();
//       })
//       .catch(error => console.error('Error:', error));
//     });
  
//     function loadAvailableSlots() {
//       fetch('/api/available-slots')
//         .then(response => response.json())
//         .then(data => {
//           slotsList.innerHTML = '';
//           data.slots.forEach(slot => {
//             const li = document.createElement('li');
//             li.innerText = `Slot ${slot.id}: ${slot.status} `;
//             slotsList.appendChild(li);
//           });
//         })
//         .catch(error => console.error('Error:', error));
//     }
  
//     loadAvailableSlots();
//   });
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('parking-form');
  const messageDiv = document.getElementById('message');
  const parkinglot = document.getElementById('parking-lot');

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
          parkinglot.innerHTML='';
          data.slots.forEach(slot => {  
            const div = document.createElement('div');  
            
            div.setAttribute('data-slot-id',`${slot.id}`);
            div.innerText = `${slot.id}`;  
            const span = document.createElement('span'); 
            span.className='tooltiptext';
            span.innerText = `${slot.status}`;
            if(slot.status.includes("available")){
              div.className='slot available tooltip';
            }else if(slot.status.includes("booked")){
              div.className='slot selected tooltip';
            }
            div.appendChild(span);
            div.addEventListener('click', function (event) {
              if (this.classList.contains('available')) {  
                this.classList.toggle('selected');  
                // Optionally, update the booking status here  
              } 
          });
            parkinglot.appendChild(div);  
          });
      })
      .catch(error => console.error('Error:', error));
  }

  loadAvailableSlots();
});

  // document.querySelectorAll('.slot').forEach(slot => {  
  //   slot.addEventListener('click', function() {  
  //     if (this.classList.contains('available')) {  
  //       this.classList.toggle('selected');  
  //       // Optionally, update the booking status here  
  //     }  
  //   });  
  // });
  
 
  