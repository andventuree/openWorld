const Sequelize = require('sequelize');
const db = require('../db')

const Repo = db.define('repo', {
  name: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      len: [1, 300]
    }
  },
  repoStarted: {
    type: Sequelize.STRING
  },
  htmlURL: {
    type: Sequelize.STRING
  },
  size: {
    type: Sequelize.INTEGER
  },
  watchers: {
    type: Sequelize.INTEGER
  },
  forks: {
    type: Sequelize.INTEGER
  },
  owner: {
    type: Sequelize.STRING
  }
})

module.exports = Repo

// license: {
//   type: Sequelize.STRING,
//   allowNull: true
// }
