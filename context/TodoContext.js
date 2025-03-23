import { useContext, createContext } from "react";
export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "msg",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    deleteTodo: (id) => {},
    toggleTodo: (id) => {},
    editTodo: (todo, id) => {},

});
export const useTodo = () => {

    return useContext(TodoContext)
}
export const TodoContextProvider = TodoContext.Provider;
