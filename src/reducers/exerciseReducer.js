const defaultState = {
  fetchingExercises: false,
  fetchedExercises: false,
  exercises: [],
  fetchingRecordings: false,
  fetchedRecordings: false,
  recordings: [],
  error: null,
  weekNumber: 0,
  prevExerciseId: -1,
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
        exercises: [],
        fetchedExercises: false,
      }
    }
    case 'FETCH_RECORDINGS': {
      return {
        ...state,
        fetchingRecordings: true,
        fetchedRecordings: false
      }
    }
    case 'FETCH_RECORDINGS_REJECTED': {
      return {
        ...state,
        fetchingRecordings: false,
        fetchedRecordings: true,
        error: action.payload
      }
    }
    case 'FETCH_RECORDINGS_FULFILLED': {
      return {
        ...state,
        fetchingRecordings: false,
        fetchedRecordings: true,
        recordings: action.payload
      }
    }
    case 'CLEAR_RECORDINGS': {
      return {
        ...state,
        recordings: [],
        fetchedRecordings: false,
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
        weekNumber: action.payload
      }
    }
    case 'NEXT_WEEK': {
      return {
        ...state,
        weekNumber: action.payload
      }
    }
    case 'SET_PREV_EXERCISE_ID': {
      return {
        ...state,
        prevExerciseId: action.payload
      }
    }
    default:{
      return state
    }
  }
}
