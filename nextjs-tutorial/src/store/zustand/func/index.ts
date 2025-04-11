import { StoreApi, UseBoundStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

export type T_DefaultStoreType = {
  /** 모달 관리 state */
  set: (key: string, value: unknown) => void;
  reset: () => void;
};

/** get,set,use 자동생성 함수 */
export const createStateHandlers = <T>(
  store: UseBoundStore<StoreApi<T & T_DefaultStoreType>>,
  initialState: Omit<T, 'set' | 'reset'>
) => {
  const keys = Object.keys(initialState);

  return keys.reduce(
    (acc, key) => {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

      acc[`get${capitalizedKey}`] = () => store.getState()[key];
      acc[`set${capitalizedKey}`] = (value: any) =>
        store.getState().set(key, value);
      acc[`use${capitalizedKey}`] = () =>
        store(useShallow((state: T) => state[key]));

      acc[key] = {
        /** state value 생성 */
        get: () => store.getState()[key],
        /** state set 생성 */
        set: (value: any) => store.getState().set(key, value),
        /** state hook 생성 */
        use: () => store(useShallow((state: T) => state[key])),
      };

      return acc;
    },
    {} as {
      [key in keyof T]: {
        get: () => T[key];
        set: (value: T[key]) => void;
        use: () => T[key];
      };
    }
  );
};
