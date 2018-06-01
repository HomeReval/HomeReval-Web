const defaultState = {
  fetchedExercises: false,
  exercises: [],
  fetchingExercises: false,
  error: null,
  weekNumber: 0
}

export default function reducer( state=defaultState, action ) {
  switch ( action.type ) {
    case 'FETCH_EXERCISES': {
      return {
        ...state,
        fetchingExercises: true,
        fetchedExercises: false
      }
    }
    case 'FETCH_EXERCISES_REJECTED': {
      return {
        ...state,
        fetchingExercises: false,
        fetchedExercises: true,
        error: action.payload
      }
    }
    case 'FETCH_EXERCISES_FULFILLED': {
      return {
        ...state,
        fetchingExercises: false,
        fetchedExercises: true,
        exercises: action.payload
      }
    }
    case 'CLEAR_EXERCISES': {
      return {
        ...state,
        exercises: []
      }
    }
    case 'CURRENT_WEEK': {
      return {
        ...state,
        weekNumber: action.payload
      }
    }
    case 'PREVIOUS_WEEK': {
      return {
        ...state,
        weekNumber: ( state.weekNumber - 1 )
      }
    }
    case 'NEXT_WEEK': {
      return {
        ...state,
        weekNumber: ( state.weekNumber + 1 )
      }
    }
    default:{
      return state
    }
  }
}
