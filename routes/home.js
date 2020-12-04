const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Courses store',
    isHome: true,
  });
});

module.exports = router;
