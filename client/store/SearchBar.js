import axios from 'axios'

const promiseArr = (accountName, fetches) => {
  let moreRequests = [];
  // fetches = fetches +
  for (let i = 1; i < fetches + 1; i++){
    moreRequests.push(axios.get(`https://api.github.com/orgs/${accountName}/repos?per_page=100&page=${i}`))
  }
  console.log('show how many pages there will be', moreRequests)
  return moreRequests;
}

const SEARCH_FOR = 'SEARCH_FOR'
const GET_REPO_DATA = 'GET_REPO_DATA'

export const searchFor = (acctDetails) => ({type: SEARCH_FOR, acctDetails})
export const getRepoData = (repoDetails) => ({type: GET_REPO_DATA, repoDetails})

export const getAccountDetails = accountName =>
  dispatch => {
    console.log('In the getAccountDetails thunk to fetch data')
    return axios.get(`https://api.github.com/orgs/${accountName}`)
    .then(acctDetails => {
      if (!acctDetails) { return console.log('There is no account by such name.') }
      else {
        // console.log(`${accountName} acctDetails: `, acctDetails);
        // console.log('acctDetails.public_repos: ', acctDetails.data.public_repos);
        let numofRepos = acctDetails.data.public_repos
        let pageRequests = Math.ceil(numofRepos / 100);
        dispatch(searchFor(accountName, acctDetails))
        return Promise.all(promiseArr(accountName, pageRequests))
      }
    })
    .then((allRepos) => {
      console.log('allRepos: ', allRepos);
      if (!allRepos.length === 0){ return console.log('This account does not have any repos.')}
      else {
        let combinedRepos = allRepos.reduce((arr, repo) => {
          return arr.concat(repo.data)
        }, [])
        dispatch(getRepoData(combinedRepos))
      }
    })
    .catch(err => console.error(err))
  }

export default function (state = {}, action){
  switch (action.type){
    case SEARCH_FOR:
      return {
        acctDetails: action.acctDetails
      }
    case GET_REPO_DATA:
      return Object.assign( state, { repoDetails: action.repoDetails })
    default:
      return state;
  }
}
