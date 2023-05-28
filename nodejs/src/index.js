import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import TestApp from './TestApp';
import TasksProviderContext from './context/TaskContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TasksProviderContext>
      <TestApp />
    </TasksProviderContext>
  </React.StrictMode>
);
