document.getElementById('itemForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const unit_price = document.getElementById('unit_price').value;
    const merchandizer = document.getElementById('merchandizer').value;
  
    const response = await fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, quantity, unit_price, merchandizer }),
    });
  
    const result = await response.json();
  
    if (response.ok) {
      document.getElementById('message').textContent = result.message;
      document.getElementById('itemForm').reset();
    } else {
      document.getElementById('message').textContent = 'Error adding item';
    }
  });
  
  