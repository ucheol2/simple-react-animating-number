import React, { FC, useEffect, useMemo, useState } from 'react';

interface Props {
  amount: number;
  duration?: number;
  step?: number;
  startNumber?: number;
}

const minInterval = 37;

const AnimatingNumber: FC<Props> = ({
  amount,
  duration = 500,
  startNumber = 0,
}) => {
  const [displayNumber, setDisplayNumber] = useState<number>(startNumber);
  const stepTime = useMemo<number>(
    () => amount ? Math.max(Math.abs(Math.floor(duration / amount)), minInterval) : minInterval,
    [amount, duration],
  );
  const stepSize = useMemo<number>(() => {
    return Math.ceil(amount * stepTime / duration) || 0;
  }, [amount, duration, stepTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayNumber((v) => {
        const newValue = v + stepSize;
        if (newValue >= startNumber + amount) {
          clearInterval(timer);
          return startNumber + amount;
        }
        return newValue;
      });
    }, stepTime);
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [amount, startNumber, stepSize, stepTime]);

  return (
    <>
      {displayNumber.toLocaleString()}
    </>
  );
};

export default AnimatingNumber;
