
import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import OverdueTasks from './components/OverdueTasks';
import axios from 'axios';

class App extends Component {
  state = {
    token: null,
    tasks:[],
    showTaskList: false, 
    overdueTasks:[]
  };

  handleLogin = (token) => {
    this.setState({ token }, this.fetchTasks);
  };

  handleLogout = () => {
    this.setState({ token: null });
  };

  addTaskToList = (newTask) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
    }));
  };

  handleupdateOverdueTasks = () => {
    const { tasks } = this.state;
    const currentDate = new Date(); // Get the current date and time
    const overdueTasks = tasks.filter(
      (task) => new Date(task.due_date) < currentDate && task.status !== 'Completed'
    );
    return overdueTasks // Update the state with overdue tasks
  };


  handleUpdateTask = async (taskId, updatedStatus) => {
    const { token } = this.state;

    try {
      // Send the updated status to the backend
      await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        { status: updatedStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the local state to reflect the changes
      this.setState((prevState) => ({
        tasks: prevState.tasks.map((task) =>
          task.id === taskId ? { ...task, status: updatedStatus } : task
        ),
      }));
    } catch (error) {
      console.error('Error:', error.response || error.message || error);
      alert('Failed to update task status.');
    }
  };


  handleDeleteTask = async (taskId) => {
    const { token } = this.state;
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Task deleted successfully!');
      this.fetchTasks(); // Refresh the task list after deletion
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task.');
    }
  };

  fetchTasks = () => {
    console.log("anandu")
    const { token } = this.state;

    if (token) {
      axios
        .get('http://localhost:3000/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({ tasks: response.data });
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
          alert('Failed to fetch tasks. Please log in again.');
          this.setState({ token: null }); 
        });
    }
  };

  toggleTaskList = () => {
    this.setState((prevState) => ({
      showTaskList: !prevState.showTaskList,
    }));
  };

  render() {
    const { token } = this.state;
    const updateOverdueTasks = this.handleupdateOverdueTasks();
    return (
      <div>
        {!token ? (
          <>
            <h1>Sign Up</h1>
            <SignupForm />
            <h1>Login</h1>
            <LoginForm onLogin={this.handleLogin} />
          </>
        ) : (
          <>
            <h1>Add Task</h1>
          
          <TaskForm token={token} updateTasksList={this.fetchTasks}  handleLogout={this.handleLogout} toggleTaskList= {this.toggleTaskList} showTaskList = {this.state.showTaskList}/>
         {this.state.showTaskList ? <OverdueTasks overdueTasks = {updateOverdueTasks} showTaskList = {this.state.showTaskList} />: <TaskList token={token} tasks = {this.state.tasks} onDeleteTask={this.handleDeleteTask} handleUpdateTask = {this.handleUpdateTask}/>
   } </>
        )}
      </div>
    );
  }
}

export default App;
