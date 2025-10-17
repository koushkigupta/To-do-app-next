const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const DUMMYJSON_BASE = "https://dummyjson.com";

app.post("/api/auth/login", async (req, res) => {
try {
const response = await axios.post(`${DUMMYJSON_BASE}/auth/login`,req.body);
res.json(response.data);
} 
catch (err){
res
.status(err.response?.status || 500)
.json(err.response?.data || { message: "Login failed"});
}
});

app.post("/api/auth/signup", async (req, res) => {
try {
const response = await axios.post(`${DUMMYJSON_BASE}/users/add`,req.body)
res.json(response.data);
} catch (err) {
res
.status(err,response?.status || 500)
.json(err.response?.data || { message: "Signup failed"})
}
});

app.get("/api/todos", async (req, res) => {
  try {
    const response = await axios.get(`${DUMMYJSON_BASE}/todos`);
    res.json(response.data.todos);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { message: "Failed to fetch todos" });
  }
});

app.post("/api/todos/add", async (req, res) => {
  try {
    const response = await axios.post(`${DUMMYJSON_BASE}/todos/add`, req.body);
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { message: "Failed to add todo" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const response = await axios.delete(`${DUMMYJSON_BASE}/todos/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { message: "Failed to delete todo" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy backend running on port ${PORT}`));