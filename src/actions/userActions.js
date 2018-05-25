import axios from "axios"
import {history} from "../helpers/history"

//User login action
export function login(username, password) {
  return function(dispatch) {
    dispatch({type: "USER_FETCH_LOGIN"})

    const url = "http://136.144.132.176:5000/api/user/login";

    const data =

    axios.post( url, {
        "username":username,
        "password":password
      }
    ).then((response) => {
        console.log(response);
        //Set local storage token
        localStorage.setItem('acces_token', response.accesToken)
        localStorage.setItem('refresh_token', response.refreshToken)
        localStorage.setItem('username', username)

        //Set logged in to true
        dispatch({type: "USER_FETCH_LOGIN_FULFILLED", payload: username})

        history.push('/')

        dispatch({type: "DISPLAY_SUCCESS_ALERT",payload: "Logged in!"})
      })
      .catch((err) => {
        dispatch({type: "USER_FETCH_LOGIN_REJECTED", payload: err})

        dispatch({type: "DISPLAY_ERROR_ALERT",payload: "Gebruikersnaam of wachtwoord is niet juist!"})
      })
  }
}

//Check if user is logged in when reloading page
// export function checkLoggedIn(){
//   return function(dispatch) {
//     if(localStorage.getItem('acces_token')){
//       dispatch({
//         type: "USER_LOGGED_IN",
//         payload: localStorage.getItem('username')
//       })
//     }
//   }
// }

export function logout(){
  //Delete localStorage login token
  localStorage.removeItem('acces_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('username')

  //Set logged in to false
  return {type: "USER_LOGOUT"}
}
