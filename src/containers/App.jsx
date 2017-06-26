import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import searchObjProp from '../modules/searchObjProp'
import * as todoActions from '../actions/todoActions'

import _ from 'lodash'

class App extends Component {
  componentDidMount(){
    let{todoActions} = this.props
    if (localStorage.getItem("tasks")!==null) {
      todoActions.fetchTasks();
    }
  }
  handleSubmit(e){
    e.preventDefault()
    let{todo} = this.props
    let taskStorage = localStorage
    let newTask = document.getElementById('newTask').value.trim()
    if (newTask!=='') {
      let{todoActions} = this.props
      let task = {
        // generate ID
        'id': "id" + Math.random().toString(16).slice(2),
        'text': newTask,
        'done': 0
      }
      todoActions.addTask(task)
      document.getElementById('newTask').value= ''
      taskStorage.setItem('tasks', JSON.stringify(todo.tasks));
    } else {
      alert('empty field')
      return false
    }
  }
  clearAll(e){
    e.preventDefault()
    let{todoActions} = this.props
    let taskStorage = localStorage
    todoActions.clearAll()
    taskStorage.setItem('tasks','[]')
    console.log('clearAll')
  }
  activeHandle(e){
    e.preventDefault()
    let _this = e.currentTarget
    _this.classList.toggle('active')
    console.log('add active')
  }
  checkHandle(e){
    e.stopPropagation();
    let{todo,todoActions} = this.props
    let taskStorage = localStorage
    let _this = e.currentTarget
    let taskId = _this.dataset.task
    let arrNum = searchObjProp(taskId,'id',todo.tasks)
    todoActions.checkTask(arrNum)
    // console.log(arrNum);
    taskStorage.setItem('tasks', JSON.stringify(todo.tasks));
    return true
  }
  deleteTask(e){
    e.preventDefault()
    let{todoActions,todo} = this.props
    let taskStorage = localStorage
    // node list to array
    var delTask = [].slice.call(document.querySelectorAll('.task__list li.active input[type="text"]'))
    if (delTask.length<1) {
      alert('select item to delete');
    } else {
      let delTaskTxt = delTask.map((item)=>{
        // return item.innerText
        return {
          'text':item.value,
          'done': 0
        }
      })
      // console.log(delTask)
      todoActions.deleteTask(delTaskTxt)
      let tasksUpd = _.differenceBy(todo.tasks,delTaskTxt,'text')
      console.log(tasksUpd)
      taskStorage.setItem('tasks', JSON.stringify(tasksUpd))
      document.querySelectorAll('.task__list li.active').forEach((el)=>{
        el.classList.remove('active')
        // console.log(el)
      })
    }
  }
  editTask(e){
    e.preventDefault()
    e.stopPropagation()
    let _this = e.target
    // console.log(_this.previousElementSibling)
    _this.previousElementSibling.removeAttribute("readonly")
    _this.previousElementSibling.focus()
  }
  saveTask(e){
    let _this = e.target
    let{todo} = this.props
    let taskStorage = localStorage
    let newTask = e.target.value.trim()
    _this.readOnly= true
    if (newTask!=='') {
      let{todoActions} = this.props
      let taskId = _this.parentNode.getAttribute('id')
      let arrNum = searchObjProp(taskId,'id',todo.tasks)
      // console.log(arrNum,newTask)
      todoActions.saveTask(arrNum,newTask)
      taskStorage.setItem('tasks', JSON.stringify(todo.tasks));
    } else {
      alert('empty field')
      return false
    }
  }
  render(){
    let{todo} = this.props
    let taskList = todo.tasks.map((item,index)=>{
      return <li key={index} onClick={::this.activeHandle} className={item.done ? 'done' : ''} id={item.id}>
        <label className='custom' onClick={::this.checkHandle} data-task={item.id}><input type="checkbox" checked={item.done ? true : false}/></label>
        <input type="text" defaultValue={item.text} readOnly onBlur={::this.saveTask}/>
        <a href="#" className="btn btn-primary" onClick={::this.editTask}>edit</a>
      </li>
    });
    // console.log(todo.tasks[0].text);
    // console.log(taskList[0]);
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-sm-offset-3 task">
            <h4 className="heading">Add task:</h4>
            <form onSubmit={::this.handleSubmit} action='index.html' method="post" className="task__add clearfix">
              <input type="text" className="form-control" id="newTask"/>
              <button className="btn btn-primary" type='submit'>add</button>
            </form>
            <div className="task__data">
              <h4 className="heading">Your tasks:</h4>
              <ul className="task__list">
                {taskList.length>0 ? taskList : <li>You don't have any tasks</li>}
              </ul>
              <div className="task__controls">
                <button className="btn btn-warning" type='button' onClick={::this.clearAll}>clear all</button>
                <button className="btn btn-danger" type='button' onClick={::this.deleteTask}>delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todo: state.todo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActions, dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App)
