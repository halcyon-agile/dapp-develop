import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useActiveTasks from "../../data/use-active-tasks";
import {
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui";
import { ColorRing } from "react-loader-spinner";
import joinConsultation from "../../api/consultations/join-consultation";
import cancelConsultation from "../../api/consultations/cancel-consultation";
import { useToast } from "../ui/use-toast";
import checkIfTimerOff from "../../lib/checkIfTimerOff";
import stopTaskApi from "../../api/stopTask";

interface Props {
  data: any;
  name: string;
  tab: "requests" | "invites";
  isFromOthers?: boolean;
}

function ConsultationItem(props: Props) {
  const { data: activeTasks } = useActiveTasks();

  const navigate = useNavigate();
  const { toast } = useToast();
  const [joining, join] = useState<boolean>(false);

  const stopTask = (taskId: number) => {
    stopTaskApi({ taskId })
      .then(() => {
        console.log('has run stop task first')
        join(true);
        joinConsultation(props?.data?.id)
          .then((response) => {
            navigate("/", { replace: true });
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: error,
            });
          });
      })
      .catch((error) => {
        // console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="w-full flex flex-1 flex-col gap-4 mt-4">
      <div className="w-full flex flex-col border rounded border-slate-200 p-4 gap-1">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex-1">
            <p className="font-medium text-base text-gray-700">
              {props?.data?.task?.name} - Consult
            </p>
          </div>
          {!props?.isFromOthers && (
            <div className="flex-row items-center">
              <button
                className="mr-3"
                onClick={() =>
                  navigate("/edit-consultation", {
                    state: {
                      data: props?.data,
                    },
                  })
                }
                disabled={props?.data?.status === "cancelled"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={
                    props?.data?.status === "cancelled" ? "#cbd5e1" : "#334155"
                  }
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
              <AlertDialog>
                <AlertDialogTrigger
                  disabled={props?.data?.status === "cancelled"}
                >
                  <button disabled={props?.data?.status === "cancelled"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={
                        props?.data?.status === "cancelled"
                          ? "#fca5a5"
                          : "#EF4444"
                      }
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to cancel?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() =>
                        cancelConsultation(props?.data?.id)
                          .then((response) => {
                            navigate("/", { replace: true });
                          })
                          .catch((error) => {
                            toast({
                              title: "Error",
                              description: error,
                            });
                          })
                      }
                      className="bg-sky-500"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
        <p className="font-medium text-xs text-gray-500">
          {props?.data?.type} |{" "}
          {moment(props?.data?.started_at).utc().format("MMM DD, YYYY hh:mm A")}
        </p>
        <p className="font-medium text-xs text-gray-500">from {!props?.isFromOthers ? "You" : `${props?.data?.admin?.first_name} ${props?.data?.admin?.last_name}`}</p>
        {/* display if consultation is expired */}
        <div
          className={`rounded-full px-4 py-1 bg-slate-100 max-w-[100px] mt-3.5 h-[24px] ${
            props?.data?.status !== "cancelled" ? "hidden" : ""
          }`}
        >
          <p className="font-medium text-xs text-center text-slate-900">
            {/* Expired */} Cancelled
          </p>
        </div>
        {activeTasks &&
        activeTasks.find((item) => item.consultation_id === props?.data?.id) ? (
          <div className="rounded-full px-4 py-1 bg-slate-100 w-[79px] max-w-[100px] mt-3.5 h-[24px]">
            <p className="font-medium text-xs text-center text-slate-900">
              Joined
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-row items-center mt-2 gap-4">
            <Button
              className={`bg-cyan-500 ${
                props?.tab === "requests" || props?.data?.status === "cancelled"
                  ? "hidden"
                  : ""
              }`}
              disabled={joining || moment(props?.data?.started_at).utc().diff(moment(), 'd') < 0}
              onClick={() => {
                if (activeTasks) {
                  if (activeTasks.length > 0) {
                    const list: any = checkIfTimerOff(activeTasks)
                    if (list?.length > 0) {
                      stopTask(list[0]?.task_id)
                    } else {
                      join(true);
                      joinConsultation(props?.data?.id)
                        .then((response) => {
                          navigate("/", { replace: true });
                        })
                        .catch((error) => {
                          toast({
                            title: "Error",
                            description: error,
                          });
                        });
                    }
                  } else {
                    join(true);
                    joinConsultation(props?.data?.id)
                      .then((response) => {
                        navigate("/", { replace: true });
                      })
                      .catch((error) => {
                        toast({
                          title: "Error",
                          description: error,
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
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              ) : (
                "Join"
              )}
            </Button>
            {/* <Button
              className="border border-slate-200"
              variant="ghost"
              onClick={() => {
                toast({
                  title: "Error",
                  description: "something",
                })
              }}
            >
              Decline
            </Button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultationItem;
