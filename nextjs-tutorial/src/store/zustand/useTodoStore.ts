import { create } from 'zustand';
import { createStateHandlers, T_DefaultStoreType } from './func';
import { I_Todo } from '../@types';

type T_TodoStore = {
  todoList: I_Todo[];
};

/**
 * Default 값
 * initialState에 state 추가 시 자동으로 get, set, use 함수 생성
 */
const initialState: T_TodoStore = {
  todoList: [
    {
      id: 0,
      author: '김민규',
      title: '할일1',
      contents: '해야돼',
      createDate: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()} `,
      updateDate: '',
    },
  ],
};

const createStore = () => {
  return create<T_TodoStore & T_DefaultStoreType>((set) => ({
    ...initialState,
    set: (key: string, value: unknown) =>
      set((state) => ({ ...state, [key]: value })),
    reset: () => set(() => initialState),
  }));
};

const useTodoStore = createStore();

export const todoStore = {
  ...createStateHandlers<T_TodoStore>(useTodoStore, initialState),
  reset: () => useTodoStore.getState().reset(),
};
