import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  ChangeEvent,
  MouseEvent,
} from "react";

export type ReturnTypes<T> = [
  T,
  (e: MouseEvent<HTMLButtonElement>) => void,
  Dispatch<SetStateAction<T>>
];

export const useModal = <T>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback(
    value
      ? (e: MouseEvent<HTMLButtonElement>) => {
          setValue(false as unknown as T);
          document.body.style.overflow = "hidden";
        }
      : (e: MouseEvent<HTMLButtonElement>) => {
          setValue(true as unknown as T);
          document.body.style.overflow = "unset";
        },
    [value, setValue]
  );

  return [value, handler, setValue];
};
