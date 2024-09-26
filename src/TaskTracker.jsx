import React, { useReducer, useState } from 'react';

const actionTasks = {
  ADD_TASK: 'add',
  DELETE_TASK: 'delete',
  EDIT_TASK: 'edit',
};

const taskReducer = (state, action) => {
  console.log(state, 'id');
  switch (action.type) {
    case actionTasks.ADD_TASK:
      return [...state, { id: Date.now(), text: action.payload }];

    case actionTasks.DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);

    case actionTasks.EDIT_TASK:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text }
          : task
      );

    default:
      return state;
  }
};

const TaskManager = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch({ type: actionTasks.ADD_TASK, payload: newTask });
      setNewTask('');
    }
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: actionTasks.DELETE_TASK, payload: id });
  };

  const handleEditTask = (id) => {
    const updatedText = prompt('Edit task:');
    if (updatedText) {
      dispatch({
        type: actionTasks.EDIT_TASK,
        payload: { id, text: updatedText },
      });
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button onClick={() => handleEditTask(task.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
