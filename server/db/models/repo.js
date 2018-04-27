const Sequelize = require('sequelize');
const db = require('../db')

const Repo = db.define('repo', {
  description: {
    type: Sequelize.TEXT
  },
  repoStarted: {
    type: Sequelize.DATE
  },
  repoLatestUpdate: {
    type: Sequelize.DATE
  },
  license: {
    type: Sequelize.STRING
  },
  openIssue: {
    type: Sequelize.INTEGER
  }
})

module.exports = Repo
