const User = require('./user')
const GithubAcct = require('./githubAcct')
const Repo = require('./repo')
const Language = require('./language')

GithubAcct.hasMany(Repo, {as: 'repo'})
Repo.belongsTo(GithubAcct, {as: 'acctOwner'})

Repo.hasMany(Language, { as: 'language'})
Language.belongsTo(Repo, { as: 'repo'})

module.exports = {
  User,
  GithubAcct,
  Repo,
  Language
}
