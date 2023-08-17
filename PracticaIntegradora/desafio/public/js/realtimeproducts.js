const socket = io();

socket.on('newProduct', (data) => {
  const product = JSON.parse(data)
  const productHTML = `
  <tr>
    <td>${product.id}</td>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>${product.price}</td>
    <td>${product.code}</td>
    <td>${product.stock}</td>
    <td>${product.category}</td>
    <td>${product.status}</td>
  </tr>`

  const table = document.getElementById('products')
  table.innerHTML+=productHTML
});

