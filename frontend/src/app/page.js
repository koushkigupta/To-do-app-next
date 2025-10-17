"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AuthContext from "../context/AuthContext";
import api from "../lib/api";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import useIdleTimer from "../hooks/useIdleTimer";
import AutoLogoutPopup from "../components/AutoLogoutPopup";

export default function Home() {
  const { token, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const router = useRouter();

  const { countdown, stayLoggedIn } = useIdleTimer(() => {
    logout();
  });

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      const fetchTodos = async () => {
        try {
          const response = await api.get("/todos");
          setTodos(response.data);
        } catch (err) {
          alert("Failed to load todos");
        }
      };
      fetchTodos();
    }
  }, [token]);


  return (
  <>
  {token&&(
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Task List</h2>

      <TaskForm onNewTask={(task) => setTodos((prev) => [task, ...prev])} />
      <TaskList todos={todos} setTodos={setTodos} />

      <AutoLogoutPopup
        countdown={countdown}
        onStay={stayLoggedIn}
        onLogout={logout}
      />
    </div>
  )}
  </>
  );
}
