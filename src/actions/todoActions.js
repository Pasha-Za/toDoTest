import {GET_TASKS_REQUEST, CLEAR_ALL,DELETE_TASK,ADD_TASK,CHECK_TASK,SAVE_TASK} from '../constants/todo'
const FAQ_URL = 'http://beta.json-generator.com/api/json/get/4yhg04M5G'

export function getTasts(tasks) {
  return (dispatch)=> {
    dispatch({
      type:GET_TASKS_REQUEST,
      payload: tasks
    })
  }
}

export function fetchTasks() {
  return (dispatch)=> {
    let taskStorage = JSON.parse(localStorage.getItem("tasks"))
    dispatch( getTasts(taskStorage))
  }
}

export function clearAll() {
  return (dispatch)=> {
    dispatch({
      type:CLEAR_ALL,
      payload: []
    })
  }
}

export function deleteTask(item) {
  return (dispatch)=> {
    dispatch({
      type:DELETE_TASK,
      payload: item
    })
  }
}
export function addTask(item) {
  return (dispatch)=> {
    dispatch({
      type:ADD_TASK,
      payload: item
    })
  }
}
export function checkTask(item) {
  return (dispatch)=> {
    dispatch({
      type:CHECK_TASK,
      payload: item
    })
  }
}
export function saveTask(item,txt) {
  return (dispatch)=> {
    dispatch({
      type:SAVE_TASK,
      payload: {
        num : item,
        text : txt
      }
    })
  }
}
