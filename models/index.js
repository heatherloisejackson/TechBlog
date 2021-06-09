const User = require('./User');
const Entry = require('./Entry');
const Comment = require('./Comment')

User.hasMany(Entry, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Entry.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Entry, {
  foreignKey: 'entry_id'
});

Entry.hasMany(Comment, {
  foreignKey: 'entry_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Entry, Comment };
