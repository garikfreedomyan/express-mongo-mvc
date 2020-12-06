const { Router } = require('express');
// const  = require('mongoose')
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses,
  });
});

router.get('/add', (req, res) => {
  res.render('add-course', {
    title: 'Add course',
    isAdd: true,
  });
});

router.post('/add', async (req, res) => {
  const { title, price, img } = req.body;
  const course = new Course({
    title,
    price,
    img,
  });

  try {
    await course.save();
    res.redirect('/courses');
  } catch (err) {
    console.error(err);
  }
});

router.get('/:id', async (req, res) => {
  course = await Course.findById(req.params.id);
  res.render('course', {
    title: `Course ${course.title}`,
    course,
  });
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  }

  course = await Course.findById(req.params.id);

  res.render('course-edit', {
    title: `Edit course ${course.title}`,
    course,
  });
});

router.post('/:id/edit', async (req, res) => {
  await Course.findByIdAndUpdate(req.params.id, req.body);

  res.redirect(`/courses/${req.params.id}`);
});

module.exports = router;
