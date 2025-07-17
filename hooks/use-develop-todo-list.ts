'use client';

import React, { useEffect, useState } from 'react';
import { TodoItem } from '@/types/todo';
import { fetcher } from '@/lib/fetcher';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await fetcher('/api/todos');
        setTodos(data);
      } catch (err) {
        setError('Failed to fetch todos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2">
            <div className="flex items-center">
              <span className="mr-2 font-bold">{todo.title}</span>
              <span>{todo.description}</span>
              <span className="ml-2 text-gray-500">{todo.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;