const router = require('express').Router()
const { GithubAcct } = require('../db/models')
module.exports = router;

// GET /api/githubAcct/
router.get('/', (req, res, next) => {
  GithubAcct.findAll()
  .then(dbSavedAccts => { res.json(dbSavedAccts)})
  .catch(next);
})

// POST /api/githubAcct/:name
router.post('/:name', (req, res, next) => {
  console.log('in the POST route of /api/githubAcct/name, heres req.body', req.body);
  console.log('req.params.name: ', req.params.name);
  GithubAcct.find({where: {name: req.params.name}})
  .then(acct => {
    if (!acct) {
      GithubAcct.create(req.body)
      .then(newAcct => res.json(newAcct))
    } else {
      GithubAcct.update(req.body, {where: { name: req.params.name }})
      .then(() => console.log(`${req.params.name} updated in DB`))
    }
  })
  .catch(next)
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

