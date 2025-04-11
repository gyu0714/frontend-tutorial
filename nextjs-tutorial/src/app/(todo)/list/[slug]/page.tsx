'use client';

import { todoStore } from '@/store/zustand/useTodoStore';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function TodoDetail() {
  const todoList = todoStore.todoList.get();
  const { size: todoId } = useSearchParams();
  const route = useRouter();

  const todo = todoList.find((t) => t.id === todoId);

  if (!todo) return route.back();

  return (
    <>
      <div key={todo.id}>
        <h1>{todo.title}</h1>
        <p>내용 : {todo.contents}</p>
        작성자 : {todo.author}
        <br />
        {todo.createDate}
      </div>
    </>
  );
}
