import { Dispatch, SetStateAction } from "react";

interface TimerProps {
  setGameTime: Dispatch<SetStateAction<number>>;
  stop: boolean;
  start: boolean;
}

export function Timer({ setGameTime, stop, start }: TimerProps) {
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  let intervalSet = false;
  var totalSeconds = 0;
  if (start && !intervalSet) {
    setInterval(setTime, 1000);
    intervalSet = true;
  }

  function setTime() {
    if (start) {
      ++totalSeconds;
      if (secondsLabel && minutesLabel && !stop) {
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad((totalSeconds / 60).toFixed(0));
      }

      if (stop) {
        setGameTime(totalSeconds);
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
      <label id="minutes">00</label>
      <label id="colon">:</label>
      <label id="seconds">00</label>
    </>
  );
}
