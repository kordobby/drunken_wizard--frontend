import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  ChangeEvent,
} from "react";

type ReturnTypes<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<T>>
];

export const useFocusHandler = <T>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback(
    value
      ? (e: ChangeEvent<HTMLInputElement>) => {
          setValue(false as unknown as T);
        }
      : (e: ChangeEvent<HTMLInputElement>) => {
          setValue(true as unknown as T);
        },
    [value, setValue]
  );

  return [value, handler, setValue];
};
