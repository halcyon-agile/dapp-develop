import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import useStore from "../store";

function AttributeHour() {
  const navigate = useNavigate();
  const [selectedTask] = useStore((state) => [state.selectedTask]);

  const [form, setForm] = useState<{
    hour: number;
    minute: number;
  }>({
    hour: 0,
    minute: 0,
  });

  return (
    <main className="flex min-h-screen flex-col items-center text-black p-5">
      <div className="text-sm w-full">
        <p className="font-semibold text-lg text-gray-900">
          How long do you want to attribute?
        </p>
      </div>
      <div className="w-full p-4 mt-3.5 border rounded-sm border-slate-200">
        <p className="font-medium text-base text-gray-700">
          {selectedTask?.task?.project?.name} - {selectedTask?.task?.name}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-row justify-between gap-4">
          <div className="flex-col flex-1 gap-1.5">
            <p className="font-medium text-sm text-slate-900">Hour</p>
            <Input
              type="hour"
              id="hour"
              placeholder="Hour"
              className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) =>
                setForm({ ...form, hour: parseInt(e.target.value, 10) })
              }
              value={form.hour !== null ? form.hour : ""}
            />
          </div>
          <div className="flex-col flex-1 gap-1.5">
            <p className="font-medium text-sm text-slate-900">Minute</p>
            <Input
              type="minute"
              id="minute"
              placeholder="Minute"
              className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) =>
                setForm({ ...form, minute: parseInt(e.target.value, 10) })
              }
              value={form.minute !== null ? form.minute : ""}
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
        <Button className="bg-cyan-500">Okay</Button>
      </div>
    </main>
  );
}

export default AttributeHour;
