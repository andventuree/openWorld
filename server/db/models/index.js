const User = require('./user')
const GithubAcct = require('./githubAcct')
const Repo = require('./repo')
const Language = require('./language')

GithubAcct.hasMany(Repo)
Repo.belongsTo(GithubAcct)

Repo.hasMany(Language)
Language.belongsTo(Repo)

module.exports = {
  User,
  GithubAcct,
  Repo,
  Language
}
