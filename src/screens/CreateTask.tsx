import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Calendar,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
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
} from "../components/ui";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { cn } from "../lib/utils";
import useTaskTypes from "../data/use-task-types";
import useProjects from "../data/use-projects";
import request from "../lib/request";
import { useMutation } from "@tanstack/react-query";
import { ColorRing } from "react-loader-spinner";
import { AlertCircle } from "lucide-react";

function CreateTask() {
  const {
    status: taskTypesStatus,
    data: taskTypes,
    error: taskTypesError,
  } = useTaskTypes();
  const {
    status: projectsStatus,
    data: projects,
    error: projectsError,
  } = useProjects();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({
    name: "",
    project_id: null,
    task_type_id: null,
    label: "",
    estimate: 0,
    started_at: "",
    ended_at: "",
  });

  const [loading, isLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});

  const mutation = useMutation(
    (task) => {
      // console.log('task', task)
      isLoading(true);
      return request.post("/api/tasks", {
        ...form,
        started_at: moment(form.started_at).utc().format("MM/DD/YYYY"),
        ended_at: moment(form.ended_at).utc().format("MM/DD/YYYY"),
      });
    },
    {
      onSuccess: () => {
        isLoading(false);
        setErrors({});
        navigate("/select-task");
      },
      onError: (error: any) => {
        // console.log('create error', error)
        isLoading(false);
        setErrors(error?.response?.data?.errors);
      },
    }
  );

  console.log("form", form);

  if (taskTypesError || projectsError) {
    return <>{taskTypesError || projectsError}</>;
  }

  return (
    <form
      className="flex min-h-screen flex-col items-center justify-between text-black p-5 font-inter"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate(form);
      }}
    >
      <div className="items-center text-sm flex flex-row w-full py-4">
        <p className="left-0 top-0 w-full text-xl font-semibold">Create Task</p>
      </div>
      <div className="flex flex-1 flex-col w-full gap-4">
        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Some errors popped up while trying to create a new task. Hover the
              info icon for more info.
            </AlertDescription>
          </Alert>
        )}
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="taskName"
            className={`${
              errors.name && "text-red-500"
            } font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
          >
            Task Name
            {errors.name && (
              <HoverCard>
                <HoverCardTrigger>
                  <AlertCircle className="h-5 w-5" color="#ef4444" />
                </HoverCardTrigger>
                <HoverCardContent className="text-red-500">
                  {errors.name[0]}
                </HoverCardContent>
              </HoverCard>
            )}
          </Label>
          <Input
            type="taskName"
            id="taskName"
            placeholder="< Task Name >"
            className={`${
              errors.name && "border-red-500"
            } text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5`}
            autoCapitalize="none"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            className={`${
              errors.project_id && "text-red-500"
            } font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
          >
            Project
            {errors.project_id && (
              <HoverCard>
                <HoverCardTrigger>
                  <AlertCircle className="h-5 w-5" color="#ef4444" />
                </HoverCardTrigger>
                <HoverCardContent className="text-red-500">
                  {errors.project_id[0]}
                </HoverCardContent>
              </HoverCard>
            )}
          </Label>
          {projectsStatus === "success" && (
            <Select onValueChange={(value: any) => setForm({...form, project_id: value})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="max-h-[200px]">
                  <SelectLabel>Projects</SelectLabel>
                  {projects.map((project: any) => (
                    <SelectItem key={`${project?.id}`} value={`${project?.id}`}>{project?.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            className={`${
              errors.task_type_id && "text-red-500"
            } font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
          >
            Type
            {errors.task_type_id && (
              <HoverCard>
                <HoverCardTrigger>
                  <AlertCircle className="h-5 w-5" color="#ef4444" />
                </HoverCardTrigger>
                <HoverCardContent className="text-red-500">
                  {errors.task_type_id[0]}
                </HoverCardContent>
              </HoverCard>
            )}
          </Label>
          {taskTypesStatus === "success" && (
            <Select onValueChange={(value: any) => setForm({...form, task_type_id: value})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="max-h-[200px]">
                  <SelectLabel>Project Types</SelectLabel>
                  {taskTypes.map((type: any) => (
                    <SelectItem key={`${type?.id}`} value={`${type?.id}`}>{type?.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            className={`${
              errors.description && "text-red-500"
            } font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
          >
            Description
            {errors.description && (
              <HoverCard>
                <HoverCardTrigger>
                  <AlertCircle className="h-5 w-5" color="#ef4444" />
                </HoverCardTrigger>
                <HoverCardContent className="text-red-500">
                  {errors.description[0]}
                </HoverCardContent>
              </HoverCard>
            )}
          </Label>
          <Textarea
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className={errors.description && "border-red-500"}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="estimate"
            className={`${
              errors.estimate && "text-red-500"
            } font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
          >
            Estimate (MH)
            {errors.estimate && (
              <HoverCard>
                <HoverCardTrigger>
                  <AlertCircle className="h-5 w-5" color="#ef4444" />
                </HoverCardTrigger>
                <HoverCardContent className="text-red-500">
                  {errors.estimate[0]}
                </HoverCardContent>
              </HoverCard>
            )}
          </Label>
          <Input
            type="number"
            id="estimate"
            placeholder="< Estimate >"
            className={`${
              errors.estimate && "border-red-500"
            } text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5`}
            autoCapitalize="none"
            onChange={(e: any) => {
              console.log('e', e)
              const re = /^[0-9\b]+$/;
              if (e.target.value === '' || re.test(e.target.value)) {
                setForm({ ...form, estimate: e.target.value })
              }
            }}
            value={form.estimate}
          />
        </div>
        <div className="flex flex-row w-full items-center justify-between gap-4">
          <div className="grid flex-1">
            <Label
              htmlFor="start"
              className={`${
                errors.started_at && "text-red-500"
              } font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
            >
              Start Date
              {errors.started_at && (
                <HoverCard>
                  <HoverCardTrigger>
                    <AlertCircle className="h-5 w-5" color="#ef4444" />
                  </HoverCardTrigger>
                  <HoverCardContent className="text-red-500">
                    {errors.started_at[0]}
                  </HoverCardContent>
                </HoverCard>
              )}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1.5",
                    !form.started_at && "text-muted-foreground",
                    errors.started_at && "border-red-500"
                  )}
                >
                  {form.started_at ? (
                    form.started_at
                  ) : (
                    <span>{`< Start Date >`}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(form.started_at)}
                  onSelect={(value) =>
                    setForm({
                      ...form,
                      started_at: moment(value).format("MM/DD/YYYY"),
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
              className={`${
                errors.ended_at && "text-red-500"
              } font-medium text-sm self-start flex flex-row gap-2.5 items-center`}
            >
              End Date
              {errors.ended_at && (
                <HoverCard>
                  <HoverCardTrigger>
                    <AlertCircle className="h-5 w-5" color="#ef4444" />
                  </HoverCardTrigger>
                  <HoverCardContent className="text-red-500">
                    {errors.ended_at[0]}
                  </HoverCardContent>
                </HoverCard>
              )}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1.5",
                    !form.ended_at && "text-muted-foreground",
                    errors.ended_at && "border-red-500"
                  )}
                >
                  {form.ended_at ? (
                    form.ended_at
                  ) : (
                    <span>{`< End Date >`}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(form.ended_at)}
                  onSelect={(value) =>
                    setForm({
                      ...form,
                      ended_at: moment(value).format("MM/DD/YYYY"),
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="w-full my-4 items-end flex flex-row justify-end gap-4 border-t pt-4">
        <Button
          variant="ghost"
          className="border border-slate-200"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button className="bg-cyan-500" type="submit" disabled={loading}>
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
    </form>
  );
}

export default CreateTask;
