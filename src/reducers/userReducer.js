const defaultState = {
  loggedIn: false,
  username: "",
  loggingIn: false,
  error: null
}

//Manage states
export default function reducer(state=defaultState, action) {

    switch (action.type) {
      case "USER_FETCH_LOGIN": {
        return {
          ...state,
          loggingIn: true
        }
      }
      case "USER_FETCH_LOGIN_REJECTED": {
        return {
          ...state,
          loggedIn: false,
          error: action.payload
        }
      }
      case "USER_FETCH_LOGIN_FULFILLED": {
        return {
          ...state,
          loggedIn: true,
          username: action.payload,
          loggingIn: false,
          error: null
        }
      }
      case "ALREADY_LOGGED_IN":{
        return {
          ...state,
          loggedIn: true
        }
      }
      case "USER_LOGOUT":{
        return{
          ...state,
          loggedIn: false,
          username: "",
          loggingIn: false,
          error: null
        }
      }
      default:{
        return state
      }
    }
}
