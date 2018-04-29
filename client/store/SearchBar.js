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

export const getAcctData = (acctDetails) => ({type: GET_ACCT_DATA, acctDetails})
export const getRepoData = (repoDetails) => ({type: GET_REPO_DATA, repoDetails})

export const getAccountDetails = accountName =>
  dispatch => {
    return axios.get(`https://api.github.com/orgs/${accountName}`)
    .then(acctDetails => {
      if (!acctDetails) { return console.log('There is no account by such name.') }
      else {
        dispatch(getAcctData(acctDetails.data))
      }
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
        dispatch(getRepoData(combinedRepos))
      }
    })
    .then(console.log('!!!Acct and repo details have been fetched!!! Repo divs should show!!!'))
    .catch(err => console.error(err))
  }

export default function (state = {}, action){
  switch (action.type){
    case GET_ACCT_DATA:
      return { acctDetails: action.acctDetails }
    case GET_REPO_DATA:
      return Object.assign( state, { repoDetails: action.repoDetails })
    default:
      return state;
  }
}
