import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const { completedTodos, unCompletedTodos } = todos.reduce(
    (acc, todo) => {
      if (todo.completed) {
        acc.completedTodos.push(todo);
      } else {
        acc.unCompletedTodos.push(todo);
      }
      return acc;
    },
    { completedTodos: [], unCompletedTodos: [] }
  );

  const handleDone = ({ id }) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div className="todo-lists">
      <div>
        <h1>Todos</h1>
        <ol>
          {unCompletedTodos.map(({ id, title }) => (
            <li key={id} onClick={() => handleDone({ id })}>
              {title}
            </li>
          ))}
        </ol>
      </div>
      <div>
        <h1>Completed Todos</h1>
        <ol class="completed-todos">
          {completedTodos.map(({ id, title }) => (
            <li key={id} onClick={() => handleDone({ id })}>
              {title}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
