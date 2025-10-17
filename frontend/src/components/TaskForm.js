"use client";

import React, { useState, useContext } from "react";
import api from "../lib/api";
import AuthContext from "../context/AuthContext";

export default function TaskForm({ onNewTask }) {
  const [todo, setTodo] = useState("");
  const { token, user } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    try {
      const res = await api.post(
        "/todos/add",
        {
          todo,
          completed: false,
          userId: user?.id || 5,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onNewTask(res.data);
      setTodo("");
    } catch (err) {
      alert("Error creating task");
    }
  };

  return (
    <form onSubmit={submit} className="d-flex mb-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Add a new task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
}
