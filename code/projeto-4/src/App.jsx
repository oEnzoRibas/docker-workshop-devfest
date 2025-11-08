import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Learn Docker', done: false },
    { id: 2, title: 'Build React app', done: false },
  ]);
  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>React Production Demo</h1>
      <p>This app is built with a multi-stage Docker build and served by Nginx.</p>
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.done ? 'line-through' : '' }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
