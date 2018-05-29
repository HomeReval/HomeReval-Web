const defaultState = {
    alert: false,
    message: "",
    backgroundColor: ""
}

export default function reducer(state=defaultState, action) {

    switch (action.type) {
      case "DISPLAY_SUCCESS_ALERT":{
        return{
          ...state,
          alert: true,
          message: action.payload,
          backgroundColor: "green"
        }
      }
      case "DISPLAY_ERROR_ALERT":{
        return{
          ...state,
          alert: true,
          message: action.payload,
          backgroundColor: "red"
        }
      }

      case "END_ALERT":{
        return{
          ...state,
          alert: false,
          message: "",
          backgroundColor: ""
        }
      }
      default:{
        return state
      }
    }
}
