import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage, Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui";
import { ColorRing } from "react-loader-spinner";
import startTaskApi from "../../api/startTask";
import useActiveTasks from "../../data/use-active-tasks";
import checkIfTimerOff from "../../lib/checkIfTimerOff";
import stopTaskApi from "../../api/stopTask";
import { useToast } from "../ui/use-toast";
import useUser from "../../data/use-user";

interface Props {
  data: any;
}

function ScrumItem(props: Props) {
  const [joining, join] = useState<boolean>(false);
  const { data: activeTasks, refetch: refetchActiveTasks } = useActiveTasks();
  const { toast } = useToast();
  const user = useUser();

  const stopTask = (taskId: number) => {
    stopTaskApi({ taskId })
      .then(() => {
        // console.log('has run stop task first')
        join(true);
        startTaskApi(props?.data?.id)
          .then(() => {
            join(false)
            refetchActiveTasks();
          })
          .catch((error: { response: { data: { message: any } } }) => {
            join(false)
            toast({
              title: "Error",
              description: error?.response?.data?.message || "Something went wrong",
            });
            // console.log('error',
            //   error?.response?.data?.message || "Something went wrong"
            // );
          });
        refetchActiveTasks();
      })
      .catch((error) => {
        // console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  console.log(user.data)
  return (
    <div className="w-full flex flex-col border rounded border-slate-200 p-4 gap-1">
      <p className="font-medium text-base text-gray-700">
        {props?.data?.project?.name} - {props?.data?.name} {props?.data?.id}
      </p>
      <p className="font-medium text-xs text-gray-500">
        {props?.data?.project?.scrums[0]?.time}{" "}
        {parseInt(props?.data?.project?.scrums[0]?.time.slice(0, 2), 10) < 12
          ? "AM"
          : "PM"}
      </p>
      <div className="flex flex-row items-center gap-1">
        {props?.data?.assignees.map((assignee: any) => (
          <TooltipProvider key={assignee.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full">
                  <Avatar>
                    {/* <AvatarImage src="" alt="@shadcn" /> */}
                    <AvatarFallback>{user.data?.id === assignee.id ? "Me" : `${assignee.first_name.match(/(\b\S)?/g).join("").toUpperCase()}${assignee.last_name.match(/(\b\S)?/g).join("").toUpperCase()}`}</AvatarFallback>
                  </Avatar>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.data?.id === assignee.id ? "Me" : `${assignee.first_name} ${assignee.last_name}`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      <div className="w-full flex flex-row items-center mt-2 gap-4">
        {activeTasks &&
        activeTasks.find((item) => item.task.id === props?.data?.id) ? (
          <div className="rounded-full px-4 py-1 bg-slate-100 w-[79px] max-w-[100px] mt-3.5 h-[24px]">
            <p className="font-medium text-xs text-center text-slate-900">
              Joined
            </p>
          </div>
        ) : (
          <Button
            className="bg-cyan-500"
            disabled={joining}
            onClick={() => {
              if (activeTasks) {
                if (activeTasks.length > 0) {
                  const list: any = checkIfTimerOff(activeTasks)
                  // console.log('list', list)
                  if (list?.length > 0) {
                    stopTask(list[0]?.task_id)
                  } else {
                    join(true);
                    startTaskApi(props?.data?.id)
                      .then(() => {
                        join(false)
                        refetchActiveTasks();
                      })
                      .catch((error: { response: { data: { message: any } } }) => {
                        join(false)
                        toast({
                          title: "Error",
                          description: error?.response?.data?.message || "Something went wrong",
                        });
                      });
                  }
                  // console.log('list', list)
                } else {
                  join(true);
                  startTaskApi(props?.data?.id)
                    .then(() => {
                      join(false)
                      refetchActiveTasks();
                    })
                    .catch((error: { response: { data: { message: any } } }) => {
                      join(false)
                      toast({
                        title: "Error",
                        description: error?.response?.data?.message || "Something went wrong",
                      });
                    });
                }
              }
            }}
          >
            {joining ? (
              <ColorRing
                visible={joining}
                height="24"
                width="24"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              "Join"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ScrumItem;
