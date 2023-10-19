import { useEffect, useState } from "react";

import { ColorRing } from "react-loader-spinner";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../../components/ui";
import { Project } from "@/types";
import getProjects from "../../api/getProjects";
import { AxiosError } from "axios";
import { cn } from "../../lib/utils";
import createSuddenConsultation from "../../api/consultations/create-sudden-consultation";
import useTaskTypes from "../../data/use-task-types";

function CreateTaskForConsultation() {
  const {
    status: taskTypesStatus,
    data: taskTypes,
    error: taskTypesError,
  } = useTaskTypes();
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [form, setForm] = useState<{
    name: string,
    description: string,
    start: any,
    end: any,
    start_time: string,
    end_time: string,
  }>({
    name: '',
    description: '',
    start: '',
    end: '',
    start_time: moment().format('HH:mm'),
    end_time: moment().format('HH:mm'),
  })
  const [fetching, fetch] = useState<boolean>(false)
  const [projects, setProjects] = useState<any>([]);
  const [selectedProject, setSelectedProject] = useState<any>();
  const [selectedTaskType, setSelectedTaskType] = useState<any>();

  useEffect(() => {
    fetch(true)
    const fetchProjects = async () => {
      try {
        const fetchProjects: Project[] = await getProjects();
        setProjects(fetchProjects);
        fetch(false);
      } catch (error: AxiosError | any) {
        fetch(false);
      }
    };
    fetchProjects();
  }, [])

  const submit = () => {
    setLoading(true)
    createSuddenConsultation(selectedProject, selectedTaskType, form.name, form.description, moment(form.start).utc().format(), moment(form.end).utc().format(), moment().utc().set({'hour': Number(form.start_time.split(':')[0]), 'minute': Number(form.start_time.split(':')[1])}).format(), moment().utc().set({'hour': Number(form.end_time.split(':')[0]), 'minute': Number(form.end_time.split(':')[1])}).format())
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((e: any) => {
        console.log(e)
        setLoading(false)
      })
    // suddenConsultation(task?.id, moment().set({'hour': Number(form.start.split(':')[0]), 'minute': Number(form.end.split(':')[1])}).format(), moment().set({'hour': Number(form.end.split(':')[0]), 'minute': Number(form.end.split(':')[1])}).format())
    //   .then(() => {
    //     setLoading(false)
    //     navigate('/')
    //   })
    //   .catch(() => {
    //     setLoading(false)
    //   })
  }

  const handleProjectChange = (value: any) => {
    setSelectedProject(value);
  };

  const handleTaskChange = (value: any) => {
    setSelectedTaskType(value)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between text-black p-5 font-inter">
      <div className="items-center text-sm flex flex-row w-full py-4">
        <p className="left-0 top-0 w-full text-xl font-semibold">Log a Consultation - Create Task</p>
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
          {projects.length > 0 ? (
            <Select onValueChange={handleProjectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="max-h-[200px]">
                  <SelectLabel>Project</SelectLabel>
                  {projects.map((data: any) => (
                    <SelectItem key={data?.id} value={data?.id}>{data?.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            ""
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="taskName"
            className={`font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
          >
            Task Type
          </Label>
          {taskTypesStatus === "success" ? (
            <Select onValueChange={handleTaskChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="max-h-[200px]">
                  <SelectLabel>Type</SelectLabel>
                  {taskTypes.map((data: any) => (
                    <SelectItem key={data?.id} value={data?.id}>{data?.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-row w-full items-center justify-between gap-4">
          <div className="grid flex-1">
            <Label
              htmlFor="start"
              className="font-medium text-sm self-start flex flex-row gap-2.5 items-center"
            >
              Start Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1.5",
                    !form.start && "text-muted-foreground"
                  )}
                >
                  {form.start ? (
                    form.start
                  ) : (
                    <span>{`< Start Date >`}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(form.start)}
                  onSelect={(value) =>
                    setForm({
                      ...form,
                      start: moment(value).format("MM/DD/YYYY"),
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid flex-1">
            <Label
              htmlFor="end"
              className="font-medium text-sm self-start flex flex-row gap-2.5 items-center"
            >
              End Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1.5",
                    !form.end && "text-muted-foreground"
                  )}
                >
                  {form.end ? (
                    form.end
                  ) : (
                    <span>{`< End Date >`}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(form.end)}
                  onSelect={(value) =>
                    setForm({
                      ...form,
                      end: moment(value).format("MM/DD/YYYY"),
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="taskName"
            className="font-medium text-sm self-start flex flex-row gap-2.5 items-center"
          >
            Task Name
          </Label>
          <Input
            type="taskName"
            id="taskName"
            placeholder="< Task Name >"
            className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
            autoCapitalize="none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            className="font-medium text-sm self-start flex flex-row gap-2.5 items-center"
          >
            Description
          </Label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="rounded-lg p-4 border border-slate-200">
          <div className="border-b border-slate-200 pb-4 mb-4">
            <p className="text-base text-gray-700">Consultation</p>
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
                  setForm({...form, start_time: e?.currentTarget?.value})
                }}
                value={form.start_time}
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
                  setForm({...form, end_time: e?.currentTarget?.value})
                }}
                // onChange={(event: any) => console.log(moment(event?.target?.valueAsDate).set({'year': moment().year(), 'day': moment().day(), 'month': moment().month()}).format('HH:mm'))}
                value={form.end_time}
              />
            </div>
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
          {(loading || fetching) ? (
            <ColorRing
              visible={(loading || fetching)}
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

export default CreateTaskForConsultation;
