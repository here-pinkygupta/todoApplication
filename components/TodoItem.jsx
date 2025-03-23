import { React, useState } from "react";
import { useTodo } from "../context";

function TodoItem({ todo }) {
  const { editTodo, deleteTodo, toggleTodo } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const updateTodo = () => {
    editTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    //console.log(todo.id);
    toggleTodo(todo.id)
  }

  return (
    <div
      className={`flex items-center justify-between bg-white p-4 my-3 rounded-lg shadow-md 
                  transition-all duration-300 transform hover:scale-[1.02] hover:bg-pink-100
                  ${todo.completed ? "bg-gray-200" : "bg-gray-100"}
                  w-full max-w-2xl mx-auto`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="w-5 h-5 text-pink-500 rounded-full border-gray-300 focus:ring-pink-500 cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Editable Input */}
      {isTodoEditable ? (
        <input
          type="text"
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          className="flex-1 mx-4 px-3 py-1 rounded-lg border border-gray-400 outline-none text-lg text-gray-800"
        />
      ) : (
        <span
          className={`flex-1 mx-4 px-3 py-1 rounded-lg text-lg
            ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}
          `}
        >
          {todoMsg}
        </span>
      )}

      {/* Edit/Save Button */}
      <button
        className="p-2 text-gray-600 hover:text-blue-500 transition duration-200"
        onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      updateTodo();
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? "📁" : "✏️"}
      </button>

      {/* Delete Button */}
      <button
        className="p-2 text-gray-600 hover:text-red-500 transition duration-200"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
