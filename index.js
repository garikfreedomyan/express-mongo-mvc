const path = require('path');
const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoute);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

(async function start() {
  const MONGOOSE_URI = 'mongodb+srv://Garik:Td9h59rK7fvSznKk@cluster0.wopml.mongodb.net/store';
  try {
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(MONGOOSE_URI, {
      useNewUrlParser: true,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
