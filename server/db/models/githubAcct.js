const Sequelize = require('sequelize');
const db = require('../db')

const GithubAcct = db.define('githubAcct', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accountType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  publicRepos: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  publicGists: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  membershipStart: {
    type: Sequelize.STRING
  }
})

module.exports = GithubAcct
