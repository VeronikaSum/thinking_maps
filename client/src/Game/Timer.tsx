import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TimerProps {
  setGameTime: Dispatch<SetStateAction<number>>;
  stop: boolean;
  start: boolean;
}

export function Timer({ setGameTime, stop, start }: TimerProps) {
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");
  var totalSeconds = 0;

  useEffect(() => {
    const interval = setInterval(setTime, 1000);
    if (stop) {
      clearInterval(interval);
      setGameTime(totalSeconds);
    }
  }, [start, stop]);

  function setTime() {
    if (start && !stop) {
      if (seconds && minutes && !stop) {
        totalSeconds = totalSeconds + 1;
        setSeconds(pad(totalSeconds % 60));
        setMinutes(pad((totalSeconds / 60).toFixed(0)));
      }
    }
  }

  function pad(val: any) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  return (
    <>
      <label id="minutes">{minutes}</label>
      <label id="colon">:</label>
      <label id="seconds">{seconds}</label>
    </>
  );
}
