import {useMemo, useState, useEffect} from 'react';

const useCountdown = (secondTime = 30) => {
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(true);

  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(secondTime);
      timerId = setInterval(() => {
        setCountDown(countDown => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer, secondTime]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  const time = useMemo(() => {
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
    const seconds = String(countDown % 60).padStart(2, 0);
    return {
      minutes,
      seconds,
    };
  }, [countDown]);

  return {
    runTimer,
    setRunTimer,
    time,
  };
};

export default useCountdown;
