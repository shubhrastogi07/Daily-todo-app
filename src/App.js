import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;

      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const saveLocalTodos = () => {
    localStorage.setItem("todos-app", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem("todos-app") === null) {
      localStorage.setItem("todos-app", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos-app"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Daily To-Do List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
