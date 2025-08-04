document.addEventListener('DOMContentLoaded', () => {
  const seatContainer = document.querySelector('.container');
  const selectedSeatsSpan = document.getElementById('selectedSeats');
  const totalPriceSpan = document.getElementById('totalPrice');
  const bookBtn = document.getElementById('bookBtn');

  const pricing = {
    a: 100, b: 100, c: 100, // Silver
    d: 200,                 // Sofa
    e: 250, f: 250,         // Sofa Extended
    g: 350, h: 350, i: 350, j: 350, k: 350, l: 350, m: 350, // Premium
    n: 450, o: 450          // Platinum
  };

  let selectedSeats = new Set();

  // Handle seat click
  seatContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('seat') || e.target.classList.contains('seat1')) return;

    const seatId = e.target.id;
    if (!seatId) return;

    if (selectedSeats.has(seatId)) {
      selectedSeats.delete(seatId);
      e.target.classList.remove('selected');
    } else {
      selectedSeats.add(seatId);
      e.target.classList.add('selected');
    }

    updateSummary();
  });

  // Update selected seat and total
  function updateSummary() {
    if (selectedSeats.size === 0) {
      selectedSeatsSpan.textContent = 'None';
      totalPriceSpan.textContent = '0';
      return;
    }

    const seatsArray = Array.from(selectedSeats).sort();
    selectedSeatsSpan.textContent = seatsArray.join(', ');

    let total = 0;
    for (const seat of seatsArray) {
      const row = seat[0].toLowerCase();
      const price = pricing[row] || 0;
      total += price;
    }

    totalPriceSpan.textContent = total;
  }

  // Handle Book Now button
  bookBtn.addEventListener('click', () => {
    if (selectedSeats.size === 0) {
      alert('⚠️ Please select at least one seat.');
    } else {
      const total = totalPriceSpan.textContent;
      const seats = Array.from(selectedSeats).sort().join(', ');
      alert(`🎟️ Seats Booked: ${seats}\n💵 Total: ₹${total}`);
    }
  });
});
