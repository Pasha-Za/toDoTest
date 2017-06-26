import {GET_TASKS_REQUEST,CLEAR_ALL,DELETE_TASK,ADD_TASK,CHECK_TASK,SAVE_TASK} from '../constants/todo'
import {difference} from 'lodash/difference'
import searchObjProp from '../modules/searchObjProp'
const initialState = {
    tasks:[]
}

export default function todo(state=initialState,action){
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return {...state, tasks:action.payload}
    case CLEAR_ALL:
      return {...state, tasks:action.payload}

    case DELETE_TASK:
      let tasksUpd = _.differenceBy(state.tasks,action.payload, 'text')
      console.log(tasksUpd)
      return {...state, tasks:tasksUpd}

    case ADD_TASK:
      let tasksNew = state.tasks
      tasksNew.push(action.payload)
      return {...state, tasks:tasksNew}

    case SAVE_TASK:
      for (var i = 0; i < state.tasks.length; i++) {
        if (i===action.payload.num) {
          state.tasks[i].text = action.payload.text
        }
      }
      let tasksSaved = state.tasks
      return {...state, tasks:tasksSaved}

    case CHECK_TASK:
      for (var i = 0; i < state.tasks.length; i++) {
        if (i===action.payload) {
          if (state.tasks[i].done === 1) {
            state.tasks[i].done = 0
          } else {
            state.tasks[i].done = 1
          }
        }
      }
      let tasksCheck = state.tasks
      // tasksNew.push(action.payload)
      return {...state, tasks:tasksCheck}

    default:
      return state
  }
}
