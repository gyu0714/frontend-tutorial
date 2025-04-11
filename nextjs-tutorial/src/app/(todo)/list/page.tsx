import { todoStore } from '@/store/zustand/useTodoStore';
import Link from 'next/link';
import React from 'react';
import TodoDetail from './[slug]/page';

export default function TodoList() {
  // const route = useRouter();

  const todoList = todoStore.todoList.get();

  return todoList.map((todo) => (
    <li key={todo.id}>
      <Link href={`/list/${todo.id}`}>{todo.title}</Link>
      {/* <TodoDetail todoId={todo.id} /> */}
    </li>
  ));
}
