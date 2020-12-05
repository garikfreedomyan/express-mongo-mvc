const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
  const courses = await Course.getAll();
  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses,
  });
});

router.get('/:id', async (req, res) => {
  course = await Course.getByID(req.params.id);
  res.render('course', {
    title: `Course ${course.title}`,
    course,
  });
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  }

  course = await Course.getByID(req.params.id);

  res.render('course-edit', {
    title: `Edit course ${course.title}`,
    course,
  });
});

router.post('/:id/edit', async (req, res) => {
  course = await Course.update({
    ...req.body,
    id: req.params.id,
  });

  res.redirect(`/courses/${req.params.id}`);
});

module.exports = router;
