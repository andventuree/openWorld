const LOAD_SUCCESS = 'LOAD_SUCCESS'
const LOAD_FAILURE = 'LOAD_FAILURE'
const RESET_LOADING = 'RESET_LOADING'

export const loadSuccess = () => ({type: LOAD_SUCCESS, loaded: true})
export const loadFailure = () => ({type: LOAD_FAILURE, loaded: false})
export const resetLoad = () => ({type: RESET_LOADING, loaded: false })

export default function (state = false, action){
  switch (action.type){
    case LOAD_SUCCESS:
      return {loaded: action.loaded};
    case LOAD_FAILURE:
      return {loaded: action.loaded};
    case RESET_LOADING:
      return {loaded: action.loaded};
    default:
      return state;
  }
}
