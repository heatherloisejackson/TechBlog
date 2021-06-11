const router = require('express').Router();
const { Entry, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const entryData = await Entry.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const entries = entryData.map((entry) => entry.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      entries, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/entry/:id', async (req, res) => {
  try {
    const entryData = await Entry.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment
        }
      ],
    });

    if (entryData) {
      const entry = entryData.get({ plain: true });

      res.render('single-post', { entry, logged_in: req.session.logged_in });
    } else {
      res.status(404).json({ message: 'No entry found with that id!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// // dashboard homepage
// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Entry }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log(err);
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// sign up - not withAuth
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// need post per user
router.get('/user/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const userData = await User.findOne({
      where: {
        name,
      },
    });
    const { id } = userData.get({ plain: true });

    const entryData = await Post.findAll({
      where: {
        user_id: id,
      },
      include: [{ model: User, attributes: ['name'] }],
    });
    const entries = entryData.map((entry) => entry.get({ plain: true }));

    res.render('posts-by-user-page', {
      name,
      entries,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// 

module.exports = router;
