const defaultState = {
  fetchedExercises: false,
  exercises: [],
  results: [],
  fetchingExercises: false,
  error: null
}

export default function reducer(state=defaultState, action) {
  switch (action.type) {
    case "FETCH_EXERCISES": {
      return {
        ...state,
        fetchingExercises: true
      }
    }
    case "FETCH_EXERCISES_REJECTED": {
      return {
        ...state,
        fetchedExercises: false,
        error: action.payload
      }
    }
    case "FETCH_EXERCISES_FULFILLED": {
      return {
        ...state,
        exercises: action.payload
      }
    }
    case "CLEAR_EXERCISES": {
      return {
        ...state,
        exercises: []
      }
    }
    default:{
      return state
    }
  }
}
