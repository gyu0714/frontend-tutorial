'use client';

import { todoStore } from '@/store/zustand/useTodoStore';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function TodoList() {
  const route = useRouter();

  const todoList = todoStore.todoList.get();

  return todoList.map((todo) => (
    <li key={todo.id}>
      <button
        onClick={() => {
          route.push(`/list/${todo.id}`);
        }}
      >
        {todo.title}
      </button>
    </li>
  ));
}
