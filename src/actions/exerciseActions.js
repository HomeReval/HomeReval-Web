import axios from "axios"

export function getExercises(){
  return function(dispatch) {
    dispatch({type: "FETCH_EXERCISES"})

    let url = "http://homereval.ga:5000/api/exercise";

    //Get access token from local storage
    let token = localStorage.getItem('access_token')

    axios.get( url, {
      headers: {
        'Authorization': 'Bearer '+ token
      }
    }).then((response) => {
        //Set fetched data
        dispatch({type: "FETCH_EXERCISES_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        //Set error
        dispatch({type: "FETCH_EXERCISES_REJECTED", payload: err})
      })
  }
}
