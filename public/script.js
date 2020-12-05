document.querySelectorAll('.course-price').forEach((el) => {
  el.textContent = toCurrency(el.textContent);
});

document.querySelectorAll('.delete-from-cart-btn').forEach((el) => {
  el.addEventListener('click', deleteFromCartClickHandler);
});

function toCurrency(price) {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency',
  }).format(price);
}

function deleteFromCartClickHandler(evt) {
  const id = evt.target.dataset.id;

  fetch(`/cart/remove/${id}`, {
    method: 'delete',
  })
    .then((res) => res.json())
    .then((cart) => {
      if (cart.courses.length) {
        const html = cart.courses
          .map((c) => {
            return `
          <tr>
            <th scope="row">${c.title}</th>
            <td>${c.count}</td>
            <td>${c.price}</td>
            <td><button type="button" class="btn btn-danger delete-from-cart-btn" data-id="${c.id}">Delete</button></td>
          </tr>
          `;
          })
          .join('');
        document.querySelector('.cart-table tbody').innerHTML = html;
        document.querySelector('.course-price').textContent = toCurrency(cart.price);
        document.querySelectorAll('.delete-from-cart-btn').forEach((el) => {
          el.addEventListener('click', deleteFromCartClickHandler);
        });
      } else {
        document.querySelector('.cart-page').innerHTML = `
              <h1>Cart</h1>
              <p>Cart is empty</p>
            `;
      }
    });
}
