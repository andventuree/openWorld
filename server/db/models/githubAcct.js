const Sequelize = require('sequelize');
const db = require('../db')

const GithubAcct = db.define('githubAcct', {
  accountType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  publicRepos: {
    type: Sequelize.Integer,
    defaultValue: 0
  }
})

module.exports = GithubAcct
