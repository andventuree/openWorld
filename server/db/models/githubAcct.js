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
    type: Sequelize.Integer,
    defaultValue: 0
  }
})

module.exports = GithubAcct
