const router = require('express').Router()
const { Repo, GithubAcct } = require('../db/models')
module.exports = router;

// GET /api/repo/
router.get('/', (req, res, next) => {
  Repo.findAll()
  .then(savedRepos => {
    if (!savedRepos) res.status(404).send('No repos saved')
    else res.json(savedRepos)
  })
  .catch(next);
})

// POST /api/repo/:githubAcctName/
router.post('/:githubAcctName', (req, res, next) => {
  // console.log('in the POST route of /api/repo/githubAcctName, heres req.body', req.body);
  // console.log('req.params.githubAcctName: ', req.params.githubAcctName)
  GithubAcct.find({where: {name: req.params.githubAcctName}})
  .then(acct => {
    if (!acct){
      res.status(404).send('Cannot find github account to update')
    } else {
      return Repo.create(req.body)
      .then(repo => res.json(repo))
    }
  })
  .then(() => console.log('Repo saved'))
  .catch(next);
})

// GET /api/repo/:githubAcctName
router.get('/:githubAcctName', (req, res, next) => {
  Repo.findAll({where: { owner: req.params.githubAcctName }})
  .then(specificRepos => {
    if (!specificRepos) res.status(404).send('No repos saved for this account')
    else res.json(specificRepos)
  })
  .catch(next)
})
