"use client";

import React, { useContext } from "react";
import api from "../lib/api";
import AuthContext from "../context/AuthContext";

export default function TaskList({ todos, setTodos }) {
  const { token } = useContext(AuthContext);

  const deleteTask = async (id) => {
    try {
      await api.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filter out the deleted task
      setTodos(todos.filter((t) => t.id !== id && t._id !== id));
    } catch (err) {
      alert("Error deleting task");
    }
  };



  return (
    <>{todos.length === 0?(
     <p className="text-muted">No tasks yet. Add some above!</p>):(
  
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id || todo._id}
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{ marginBottom: "0.5rem" }}
        >
          {todo.todo}
          <button
            className="btn btn-sm btn-danger"
            style={{ marginLeft: "1rem" }}
            onClick={() => deleteTask(todo.id || todo._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
     )}</>
  );
}
