import axios from 'axios'
import { loadSuccess, loadFailure } from '../store'

// Helper functions
const repoAPIFetch = (accountName, fetches) => {
  let repoRequestPages = [];
  for (let i = 1; i < fetches + 1; i++){
    repoRequestPages.push(axios.get(`https://api.github.com/orgs/${accountName}/repos?per_page=100&page=${i}`))
  }
  return repoRequestPages;
}

const formatAcctDataToDB = (accountAPIDetails) => {
  return {
    name: accountAPIDetails.name.toLowerCase(),
    accountType: accountAPIDetails.type,
    publicRepos: accountAPIDetails.public_repos,
    publicGists: accountAPIDetails.public_gists,
    membershipStart: accountAPIDetails.created_at,
    avatarURL: accountAPIDetails.avatar_url
  }
}

const formatRepoDataToDB = (repoAPIDetails, ownerName) => {
  return {
    name: repoAPIDetails.name,
    description: repoAPIDetails.description || 'No description',
    repoStarted: repoAPIDetails.created_at.slice(0, 4),
    htmlURL: repoAPIDetails.html_url,
    size: repoAPIDetails.size,
    watchers: repoAPIDetails.watchers_count,
    forks: repoAPIDetails.forks_count,
    owner: ownerName.toLowerCase()
  }
}

// Redux items
let initialState = {
  account: {},
  repos: [],
}

const FETCH_ACCT_API = 'FETCH_ACCT_API'
const FETCH_REPOS_API = 'FETCH_REPOS_API'

export const fetchAcctAPI = (account) => ({type: FETCH_ACCT_API, account})
export const fetchReposAPI = (repos) => ({type: FETCH_REPOS_API, repos})

export const getAcctAndRepoDetailsFromAPI = accountName =>
  dispatch => {
    return axios.get(`https://api.github.com/orgs/${accountName}`)
    .then(acctAPIResponse => {
      let acctDataDBSafe = formatAcctDataToDB(acctAPIResponse.data) //for when we save to DB
      dispatch(fetchAcctAPI(acctDataDBSafe))
      return acctDataDBSafe;
        // return axios.post(`/api/githubAcct/${acctAPIResponse.data.name.toLowerCase()}`, githubAcctData) //use to post to DB
    })
    .then(acctDataDBSafe => {
      let pageRequests = Math.ceil(acctDataDBSafe.publicRepos / 100);
      return Promise.all(repoAPIFetch(acctDataDBSafe.name, pageRequests))
    })
    .then(repoAPIResponse => {
      let reposAPI = repoAPIResponse.reduce((arr, nextPage) => {
        return arr.concat(nextPage.data)
      }, [])
      let reposDataDBSafe = []

      reposAPI.forEach(repo => {
        let newForm = formatRepoDataToDB(repo, accountName)
        reposDataDBSafe.push(newForm)
      })
      return reposDataDBSafe
    })
    .then(reposDataDBSafe => {
        // reposDataDBSafe.forEach(repo => { //use to post to DB
        //   axios.post(`/api/repo/${repo.ownerName}`, repo)
        //   .then(() => console.log(`${repo.name} saved to DB`))
        // })
        return reposDataDBSafe
    })
    .then(formattedRepos => dispatch(fetchReposAPI(formattedRepos)))
    .then(() => console.log('Account and repos fetched'))
    .then(() => dispatch(loadSuccess()))
    .catch(err => {
      dispatch(loadFailure())
      console.error(err)
    })
  }

export default function (state = initialState, action){
  switch (action.type){
    case FETCH_ACCT_API:
      return { account: action.account }
    case FETCH_REPOS_API:
      return Object.assign( state, { repos: action.repos })
    default:
      return state;
  }
}
