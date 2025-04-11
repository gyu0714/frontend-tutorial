import { todoStore } from '@/store/zustand/useTodoStore';
import React from 'react';

export default function TodoDetail({ todoId }: { todoId: number }) {
  const todoList = todoStore.todoList.get();
  const todo = todoList.find((t) => t.id === todoId);

  return (
    <>
      {/* <div key={todo.id}>
        <h1>{todo.title}</h1>
        <p>내용 : {todo.contents}</p>
        작성자 : {todo.author}
        <br />
        {todo.createDate}
      </div> */}
    </>
  );
}
