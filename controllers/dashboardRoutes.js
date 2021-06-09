const router = require('express').Router();
const { Entry, User } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Entry }],
    });

    const user = userData.get({ plain: true });

    res.render('user-homepage', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const EntryData = await Entry.findByPk(req.params.id);

    if (EntryData) {
      const Entry = EntryData.get({ plain: true });
      console.log(Entry);
      res.render('edit-Entry', {
        layout: 'dashboard',
        Entry,
        logged_in: true,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', async (req, res) => {
  res.render('new-Entry', {
    layout: 'dashboard',
    logged_in: true,
  });
});

module.exports = router;