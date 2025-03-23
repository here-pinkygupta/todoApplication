import { TodoForm, TodoItem } from "../components";
import { TodoContextProvider, useTodo } from "../context";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (todo, id) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const editTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo: prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Filtered Todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <TodoContextProvider value={{ addTodo, editTodo, deleteTodo, toggleTodo }}>
      <div className="bg-[#ffc7ce] min-h-screen py-8 flex items-center justify-center">
        <div className="bg-white w-full max-w-xl rounded-lg p-6 shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            To-Do List 📋
          </h1>
          <TodoForm />

          {/* Tabs: All, Active, Completed */}
          {todos.length > 0 && (
            <div className="flex justify-around mt-4 text-gray-700 mb-4">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "all"
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-100"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "active"
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-100"
                }`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "completed"
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-100"
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          )}

          {/* Display Todos */}
          <div className="space-y-3 mt-4">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
