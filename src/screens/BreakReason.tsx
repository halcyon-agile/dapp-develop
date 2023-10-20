import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import startBreakApi from "../api/startBreak";
import useStore from "../store";

function BreakReason() {
  const [breakForm, setBreakForm] = useStore((state) => [
    state.breakForm,
    state.setBreakForm,
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(breakForm);
  }, [breakForm]);

  const startBreak = () => {
    console.log({ breakForm });
    startBreakApi(breakForm)
      .then(() => navigate("/break-timer"))
      .catch((error) => {
        console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center text-black px-4">
      <div className="w-full">
        <div className="w-full py-4 border-b border-slate-200">
          <p className="font-semibold text-xl text-gray-900">Break Reason</p>
        </div>
        {/* <div className="w-full py-4 border-b border-slate-200">
          <p className="font-normal text-base text-slate-700">Reason 1</p>
        </div>
        <div className="w-full py-4 border-b border-slate-200">
          <p className="font-normal text-base text-slate-700">Reason 2</p>
        </div>
        <div className="w-full py-4 border-b border-slate-200">
          <p className="font-normal text-base text-slate-700">Reason 3</p>
        </div> */}
        <div className="w-full py-4">
          {/* <Label
            htmlFor="reason"
            className="font-medium text-sm text-slate-900"
          >
            Other Reason
          </Label> */}
          <Input
            type="reason"
            id="reason"
            className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
            autoCapitalize="none"
            onChange={(e) =>
              setBreakForm({
                ...breakForm,
                reason: e.target.value,
              })
            }
            value={breakForm.reason}
          />
        </div>
      </div>
      <div className="w-full items-end flex flex-row justify-end gap-4">
        <Button
          variant="ghost"
          className="border border-slate-200"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button className="bg-cyan-500" onClick={() => startBreak()}>
          Okay
        </Button>
      </div>
    </main>
  );
}

export default BreakReason;
