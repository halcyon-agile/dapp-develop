import { useState } from "react";

import { ColorRing } from "react-loader-spinner";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  Input,
  Label,
} from "../../components/ui";
import suddenConsultation from "../../api/consultations/sudden-consultation";

function LogConsultation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState<boolean>(false)
  const [form, setForm] = useState<{start: string, end: string}>({
    start: moment().format('HH:mm'),
    end: moment().format('HH:mm'),
  })

  const task = location?.state?.task

  // console.log(task)

  const submit = () => {
    setLoading(true)
    suddenConsultation(task?.id, moment().utc().set({'hour': Number(form.start.split(':')[0]), 'minute': Number(form.start.split(':')[1])}).format(), moment().utc().set({'hour': Number(form.end.split(':')[0]), 'minute': Number(form.end.split(':')[1])}).format())
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between text-black p-5 font-inter">
      <div className="items-center text-sm flex flex-row w-full py-4">
        <p className="left-0 top-0 w-full text-xl font-semibold">Log a Consultation - {task?.name}</p>
      </div>
      <div className="flex flex-1 flex-col w-full gap-4">
        {/* {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Some errors popped up while trying to create a new task. Hover the
              info icon for more info.
            </AlertDescription>
          </Alert>
        )} */}
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="taskName"
            className={`font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
          >
            Project
          </Label>
          <Input
            placeholder="< Project >"
            className={`text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5`}
            autoCapitalize="none"
            value={task?.project?.name}
            contentEditable={false}
            disabled
            // onChange={(e) => setForm({ ...form, name: e.target.value })}
            // value={form.name}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="taskName"
            className={`font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
          >
            Task Name
          </Label>
          <Input
            placeholder="< Task Name >"
            className={`text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5`}
            autoCapitalize="none"
            value={task?.name}
            contentEditable={false}
            disabled
            // onChange={(e) => setForm({ ...form, name: e.target.value })}
            // value={form.name}
          />
        </div>
        <div className="w-full flex flex-row items-center justify-between gap-4">
          <div className="flex-1 flex-col gap-1.5">
            <Label
              htmlFor="startTime"
              className="font-medium text-sm text-slate-900 self-start"
            >
              Start Time
            </Label>
            <Input
              type="time"
              id="startTime"
              placeholder="< Start Time >"
              className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) => {
                setForm({...form, start: e?.currentTarget?.value})
                if (moment().utc().set({'hour': Number(e?.currentTarget?.value.split(':')[0]), 'minute': Number(e?.currentTarget?.value.split(':')[1])}).diff(moment().utc().set({'hour': Number(form.end.split(':')[0]), 'minute': Number(form.end.split(':')[1])})) > 0) {
                  setForm({...form, end: e?.currentTarget?.value })
                }
              }}
              value={form.start}
            />
          </div>
          <div className="flex-1 flex-col gap-1.5">
            <Label
              htmlFor="endTime"
              className="font-medium text-sm text-slate-900 self-start"
            >
              End Time
            </Label>
            <Input
              type="time"
              id="endTime"
              placeholder="< End Time >"
              className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
              autoCapitalize="none"
              onChange={(e) => {
                if (moment().utc().set({'hour': Number(e?.currentTarget?.value.split(':')[0]), 'minute': Number(e?.currentTarget?.value.split(':')[1])}).diff(moment().utc().set({'hour': Number(form.start.split(':')[0]), 'minute': Number(form.start.split(':')[1])})) > 0) {
                  setForm({...form, end: e?.currentTarget?.value})
                }
              }}
              // onChange={(event: any) => console.log(moment(event?.target?.valueAsDate).set({'year': moment().year(), 'day': moment().day(), 'month': moment().month()}).format('HH:mm'))}
              value={form.end}
            />
          </div>
        </div>
      </div>
      <div className="w-full my-4 items-end flex flex-row justify-end gap-4 border-t pt-4">
        <Button
          variant="ghost"
          className="border border-slate-200"
          onClick={() => navigate('/select-task-for-consultation')}
        >
          Cancel
        </Button>
        <Button
          className="bg-cyan-500"
          type="submit"
          onClick={submit}
        >
          {loading ? (
            <ColorRing
              visible={loading}
              height="24"
              width="24"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
}

export default LogConsultation;
