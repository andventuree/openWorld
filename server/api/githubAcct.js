const router = require('express').Router()
const { GithubAcct } = require('../db/models')
module.exports = router;

// GET /api/githubAcct/
router.get('/', (req, res, next) => {
  GithubAcct.findAll()
  .then(dbSavedAccts => { res.json(dbSavedAccts)})
  .catch(next);
})

// GET /api/githubAcct/:name
router.get('/:name', (req, res, next) => {
  GithubAcct.findOne({where: {name: req.params.name}})
  .then(acct => {
    if (!acct) res.status(404).send('Github account not found')
    else return res.json(acct)
  })
  .catch(next)
})

// GET /api/githubAcct/:id
router.get('/:id', (req, res, next) => {
  GithubAcct.findById(req.params.id)
  .then(acct => {
    if (!acct) res.status(404).send('Github account not found')
    else return res.json(acct)
  })
  .catch(next)
})

