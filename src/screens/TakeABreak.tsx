import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import useStore from "../store";

function TakeABreak() {
  const navigate = useNavigate();
  const [breakForm, setBreakForm] = useStore((state) => [
    state.breakForm,
    state.setBreakForm,
  ]);

  useEffect(() => {
    console.log(breakForm);
  }, [breakForm]);

  return (
    <main className="flex min-h-screen flex-col items-center text-black p-5">
      <div className="text-sm w-full">
        <p className="font-semibold text-lg text-gray-900">
          How long will your break be?
        </p>
      </div>
      <div className="w-full p-4 mt-3.5 border rounded-sm border-slate-200">
        <div className="flex flex-row justify-between gap-4">
          <div className="flex-col flex-1 gap-1.5">
            <p className="font-medium text-sm text-slate-900">Hour</p>
            <Input
              type="hours"
              id="hours"
              placeholder="Hour"
              className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                  setBreakForm({
                    ...breakForm,
                    hours: e.target.value,
                  })
                }
              }}
              maxLength={2}
              value={breakForm.hours !== null ? breakForm.hours : ""}
            />
          </div>
          <div className="flex-col flex-1 gap-1.5">
            <p className="font-medium text-sm text-slate-900">Minute</p>
            <Input
              type="minutes"
              id="minutes"
              placeholder="Minute"
              className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                  setBreakForm({
                    ...breakForm,
                    minutes: e.target.value,
                  })
                }
              }}
              maxLength={2}
              value={breakForm.minutes !== null ? breakForm.minutes : ""}
            />
          </div>
        </div>
      </div>
      <div className="w-full my-4 items-end flex flex-row justify-end gap-4">
        <Button
          variant="ghost"
          className="border border-slate-200"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          className="bg-cyan-500"
          onClick={() => navigate("/break-reason", { state: breakForm })}
        >
          Okay
        </Button>
      </div>
    </main>
  );
}

export default TakeABreak;
