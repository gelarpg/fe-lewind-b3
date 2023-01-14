import React, {useRef, useEffect} from 'react'

const usePrevious = (value) => {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value
  }, [value]);

  return valueRef.current;
}

export default usePrevious