import axios from "axios";

export default axios.create({
  baseURL: "https://kai-jun-task-b.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  }
});