import { useEffect, useRef, useState } from "react";

export default function useIdleTimer(onLogout) {
  const IDLE_TIMEOUT = 10 * 60 * 1000; 
  const COUNTDOWN_DURATION = 60; 
  const [countdown, setCountdown] = useState(null);

  const idleTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const countdownRef = useRef(countdown);


  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  const startIdleTimer = () => {
    clearTimeout(idleTimeoutRef.current);
    clearInterval(countdownIntervalRef.current);
    setCountdown(null);

    idleTimeoutRef.current = setTimeout(() => {
      let secondsLeft = COUNTDOWN_DURATION;
      setCountdown(secondsLeft);

      countdownIntervalRef.current = setInterval(() => {
        secondsLeft -= 1;
        setCountdown(secondsLeft);

        if (secondsLeft <= 0) {
          clearInterval(countdownIntervalRef.current);
          onLogout();
        }
      }, 1000);
    }, IDLE_TIMEOUT);
  };

  useEffect(() => {
    const handleActivity = () => {
      // Restart timer only if countdown is not active
      if (countdownRef.current === null) {
        startIdleTimer();
      }
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => window.addEventListener(event, handleActivity));

    startIdleTimer();

    return () => {
      clearTimeout(idleTimeoutRef.current);
      clearInterval(countdownIntervalRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );
    };
  }, []);

  const stayLoggedIn = () => {
    clearInterval(countdownIntervalRef.current);
    setCountdown(null);
    startIdleTimer();
  };

  return { countdown, stayLoggedIn };
}
