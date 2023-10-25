import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

import { Button } from "../components/ui/button";
import getBreakApi from "../api/getBreak";
import endBreakApi from "../api/endBreak";
import { Breaks } from "../types";
import { AxiosError } from "axios";
import useStore from "../store";

function BreakTimer() {
  const navigate = useNavigate();
  const [setBreakForm] = useStore((state) => [state.setBreakForm]);
  const [_, setStartDateTime] = useState<DateTime | null>(null);
  const [timer, setTimer] = useState(0);
  const [alertInSeconds, setAlertInSeconds] = useState(1000);
  const [breakEnded, setBreakEnded] = useState(false);

  useEffect(() => {
    const getBreak = async () => {
      try {
        const breaks: Breaks = await getBreakApi();
        return breaks;
      } catch (error: AxiosError | any) {
        console.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    const updateTimer = async () => {
      const breaks = await getBreak();
      console.log('breaks', breaks)
      if (breaks?.started_at) {
        const startedAt = DateTime.fromISO(breaks?.started_at);
        setStartDateTime(startedAt);
        const now = DateTime.now();

        const elapsedSeconds = Math.floor(
          now.diff(startedAt, "seconds").seconds
        );
        setTimer(elapsedSeconds);
        setAlertInSeconds(breaks?.minutes * 60);
      }
    };

    updateTimer();

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (timer && timer >= alertInSeconds) {
      setBreakEnded(true);
    } else {
      setBreakEnded(false);
    }
  }, [timer]);

  const endBreak = () => {
    endBreakApi()
      .then(() => {
        setBreakForm({ reason: "", minutes: 15, hours: 0 });
        navigate("/");
      })
      .catch((error) => {
        console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  // console.log('timer', timer)
  // console.log('alertInSeconds', alertInSeconds)

  return (
    <main className="flex min-h-screen flex-col text-black py-16">
      <div className="w-full flex flex-col items-center gap-4">
        <p className="font-semibold text-3xl text-gray-900 text-center">
          TIME ELAPSED
        </p>
        {breakEnded && (
          <div className="rounded-full px-4 py-1 bg-red-600">
            <p className="font-medium text-xs text-white">
              ALERT! Break exceeds inputted time.
            </p>
          </div>
        )}
        <p className="font-semibold text-2xl text-gray-900 text-center">
          {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
          {timer % 60}
        </p>
        <Button className="bg-cyan-500 px-4" onClick={endBreak}>
          End Break
        </Button>
      </div>
    </main>
  );
}

export default BreakTimer;
