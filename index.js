const apiUrl = 'http://localhost:3000/products';

function fetchProducts() {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        renderProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }
  

function renderProducts(products) {
  const tableBody = document.getElementById('product-table-body');
  tableBody.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>
        <button class="update" onclick="updateProduct(${product.id})">Update</button>
        <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function addProduct() {
    const newName = prompt('Enter the product name:');
    const newPrice = parseFloat(prompt('Enter the product price:'));
  
    if (newName && !isNaN(newPrice)) {
      const newProduct = {
        name: newName,
        price: newPrice.toFixed(2),
      };
  
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        fetchProducts();
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
    } else {
      alert('Invalid input. Please try again.');
    }
  }
  
  function updateProduct(id) {
    const productToUpdate = prompt('Enter the new product name:', '');
    const newPrice = parseFloat(prompt('Enter the new product price:', ''));
  
    if (productToUpdate && !isNaN(newPrice)) {
      const updatedProduct = {
        name: productToUpdate,
        price: newPrice.toFixed(2),
      };
  
      fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        fetchProducts();
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
    } else {
      alert('Invalid input. Please try again.');
    }
  }
  
  function deleteProduct(id) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
  
    if (confirmDelete) {
      fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        fetchProducts();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
    }
  }
  

fetchProducts();
