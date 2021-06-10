const router = require('express').Router();
const { Entry } = require('../../models');
const withAuth = require('../../utils/auth.js');

router.post('/', withAuth, async (req, res) => {
  try {
    const newEntry = await Entry.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEntry);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const entryData = await Entry.update(
      {
        ...req.body,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json(entryData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const entryData = await Entry.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!entryData) {
      res.status(404).json({ message: 'No entry found with this id!' });
      return;
    }

    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
