import React, { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const newTimer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(newTimer);
    };
  }, [value, delay]);

  return debounceValue;
}
