import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Terminal } from "lucide-react";
import { Task, Project } from "@/types";
import getTasks from "../../api/getTasks";
import getProjects from "../../api/getProjects";
import useActiveTasks from "../../data/use-active-tasks";
import { Alert, AlertDescription, AlertTitle, Button, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { set } from "date-fns";

function SelectTaskForConsult() {
  const { data: activeTasks } = useActiveTasks();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedProject, setCurrentProject] = useState<any>(null);
  const [fetching, fetch] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projectFilter, setProjectFilter] = useState<any>(null);
  const [projects, setProjects] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const projectIsSelected = selectedProject !== null;

  useEffect(() => {
    fetch(true)
    const userData = localStorage.getItem("token");
    if (!userData) {
      navigate("/login", {
        replace: true,
      });
    }

    setTasks([])

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
  }, []);

  useEffect(() => {
    fetch(true)
    const userData = localStorage.getItem("token");
    if (!userData) {
      navigate("/login", {
        replace: true,
      });
    }

    setTasks([])

    const fetchTasks = async (filter: number) => {
      try {
        const fetchedTasks: Task[] = await getTasks(filter);
        setTasks(
          fetchedTasks.filter(
            (task) =>
              !activeTasks?.find((activeTask) => activeTask.task.id === task.id)
          )
        );
        fetch(false);
      } catch (error: AxiosError | any) {
        fetch(false);
      }
    };

    fetchTasks(projectFilter);
  }, [projectFilter]);

  const handleSelectChange = (value: any) => {
    setProjectFilter(value);
  };

  const onContinue = () => {
    navigate("/log-consultation", {
      replace: false,
      state: {
        task: tasks.find((task) => task.id === selectedProject),
      },
    })
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between text-black p-5 font-inter">
      <div className="items-center text-sm flex flex-row w-full border-b border-slate-200 py-4">
        <p className="left-0 top-0 w-full text-xl flex-1 font-semibold">
          Projects
        </p>
      </div>
      <div className="flex flex-col flex-1 bg-white w-full h-full text-black mt-5">
        {projects.length > 0 ? (
          <Select onValueChange={handleSelectChange}>
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
        {/* <div className="w-full mt-4 pb-2 border-b">
          <Button
            variant="ghost"
            className="border w-full"
            onClick={() =>
              navigate("/create-task-for-consultation")
            }
          >
            Create New Task
          </Button>
        </div> */}
        <div className="flex flex-row items-center justify-between w-full rounded-md gap-2.5 my-2.5">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a task"
          />
        </div>
        <div className="w-full py-2">
          {fetching && (
            <ColorRing
              visible={fetching}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
          {tasks.length > 0 ? (
            tasks.filter((x: any) => x.name.toLowerCase().includes(search.toLowerCase()) || x.project.name.toLowerCase().includes(search.toLowerCase())).map((data: any, index: number) => (
              <button
                className={`flex w-full py-2 border-b ${
                  selectedProject === data.id && "bg-slate-300"
                }`}
                key={data?.id}
                onClick={() => {
                  setCurrentProject(data.id);
                }}
                onDoubleClick={() => {
                  setCurrentProject(data.id);
                  onContinue();
                }}
              >
                <div
                  className={`py-1.5 px-2 w-full rounded-md flex flex-row items-center justify-between`}
                >
                  <p
                    className={`left-0 top-0 w-full text-1xl flex-1 text-left font-normal text-base text-slate-700`}
                  >
                    {data.project.name} - {data.name}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#334155"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </button>
            ))
          ) : !fetching ? (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                There are no tasks available right now.
              </AlertDescription>
            </Alert>
          ) : null}
        </div>
        <div className="w-full my-4 items-end flex flex-row justify-end gap-4">
          {location?.state?.screen !== "login" && (
            <Button
              variant="ghost"
              className="border border-slate-200"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          )}
          <Button
            className="bg-cyan-500"
            onClick={onContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </main>
  );
}

export default SelectTaskForConsult;
