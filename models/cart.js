const path = require('path');
const fs = require('fs');

const cartPath = path.join(__dirname, '..', 'data', 'cart.json');

class Cart {
  static async add(course) {
    const cart = await Cart.fetch();

    const idx = cart.courses.findIndex((el) => el.id === course.id);
    const condidate = cart.courses[idx];

    if (condidate) {
      condidate.count++;
      cart.courses[idx] = condidate;
    } else {
      course.count = 1;
      cart.courses.push(course);
    }

    cart.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  }

  static async remove(id) {
    const cart = await Cart.fetch();

    const idx = cart.courses.findIndex((el) => el.id === id);
    const course = cart.courses[idx];

    if (course.count === 1) {
      cart.courses = cart.courses.filter((el) => el.id !== id);
    } else {
      cart.courses[idx].count--;
    }

    cart.price -= course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
        if (err) reject(err);

        resolve(cart);
      });
    });
  }

  static async fetch() {
    return new Promise(async (resolve, reject) => {
      await fs.readFile(cartPath, 'utf-8', (err, content) => {
        if (err) reject(err);

        resolve(JSON.parse(content));
      });
    });
  }
}

module.exports = Cart;
