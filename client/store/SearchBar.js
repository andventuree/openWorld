import axios from 'axios'

const promiseArr = (accountName, fetches) => {
  let moreRequests = [];
  for (let i = 1; i < fetches + 1; i++){
    moreRequests.push(axios.get(`https://api.github.com/orgs/${accountName}/repos?per_page=100&page=${i}`))
  }
  return moreRequests;
}

const GET_ACCT_DATA = 'GET_ACCT_DATA'
const GET_REPO_DATA = 'GET_REPO_DATA'
const FETCH_DB_REPO = 'FETCH_DB_REPO'

export const getAcctData = (acctDetails) => ({type: GET_ACCT_DATA, acctDetails})
export const getRepoData = (repoDetails) => ({type: GET_REPO_DATA, repoDetails})
export const fetchDBRepo = (repos) => ({type: FETCH_DB_REPO, repos})

export const getAccountDetails = accountName =>
  dispatch => {
    return axios.get(`https://api.github.com/orgs/${accountName}`)
    .then(acctDetails => {
      if (!acctDetails) { console.log('There is no account by such name.') }
      else {
        console.log('--->acctDetails: ', acctDetails.data);
        dispatch(getAcctData(acctDetails.data))
        let githubAcctData = {
          name: acctDetails.data.name.toLowerCase(),
          accountType: acctDetails.data.type,
          publicRepos: acctDetails.data.public_repos,
          publicGists: acctDetails.data.public_gists,
          membershipStart: acctDetails.data.created_at,
          avatarURL: acctDetails.data.avatar_url
        }
        return axios.post(`/api/githubAcct/${acctDetails.data.name.toLowerCase()}`, githubAcctData)
      }
    })
    .then(() => console.log('new account posted to DB'))
    .catch(err => console.error(err))
  }

export const fetchAcctFromDB = accountName =>
  dispatch => {
    return axios.get(`/api/repo/${accountName}`)
    .then(res => {
      console.log('res: ', res);
      dispatch(fetchDBRepo(res.data))
    })
    .catch(err => console.error(err))
  }

export const getRepoDetails = (accountName, numOfRepos) =>
  dispatch => {
    let pageRequests = Math.ceil(numOfRepos / 100);
    Promise.all(promiseArr(accountName, pageRequests))
    .then((allRepos) => {
      if (!allRepos.length === 0){ return console.log('This account does not have any repos.')}
      else {
        let combinedRepos = allRepos.reduce((arr, nextPage) => {
          return arr.concat(nextPage.data)
        }, [])
        console.log('combinedRepos: ', combinedRepos);
        dispatch(getRepoData(combinedRepos))
        combinedRepos.forEach(repo => {
          // let santizedLicense = !repo.license.name ? 'License not specified' : repo.license.name;
          let repoData = {
            name: repo.name.toLowerCase(),
            description: repo.description,
            repoStarted: repo.created_at,
            htmlURL: repo.html_url,
            size: repo.size,
            watchers: repo.watchers_count,
            forks: repo.forks_count,
            owner: accountName.toLowerCase()
            // license: santizedLicense,
          }
          axios.post(`/api/repo/${accountName.toLowerCase()}`, repoData)
          .then(() => console.log(`${repo.name} saved to DB`))
        })
      }
    })
    .catch(err => console.error(err))
  }

export default function (state = {}, action){
  switch (action.type){
    case GET_ACCT_DATA:
      return { acctDetails: action.acctDetails }
    case GET_REPO_DATA:
      return Object.assign( state, { repoDetails: action.repoDetails })
    case FETCH_DB_REPO:
      return Object.assign( state, { repos: action.repos })
    default:
      return state;
  }
}
