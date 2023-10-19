import { useEffect, useState } from "react";
import moment from "moment";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import { cn } from "../../lib/utils";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";
import updateCurrentEstimate from "../../api/updateCurrentEstimate";
import { ColorRing } from "react-loader-spinner";

interface Props {
  visible: boolean;
  remainingHours: number | boolean;
  initialEstimateHours: number;
  currentEstimateHours: number;
  totalRenderedHours: number;
  started_at: string;
  id: number;
  onUpdateSuccess: () => void;
  isConsultation: boolean;
  ganttEnabled: boolean;
}

function Graph(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [time, setTime] = useState("");
  const [currentEstimate, setCurrentEstimate] = useState<number>(0);
  const [updatingEstimate, isUpdatingEstimate] = useState<boolean>(false);
  const [dialogOpen, isDialogOpen] = useState<boolean>(false);

  const longestHour = Math.max(
    props.initialEstimateHours,
    props.currentEstimateHours,
    props.totalRenderedHours,
    typeof props.remainingHours === "number" ? props.remainingHours : 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDiff = moment.duration(
        moment().utc().diff(moment(props?.started_at).utc())
      );
      const hour = timeDiff.hours();
      const formatHour = Math.floor(hour);
      setTime(`${formatHour}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    setCurrentEstimate(props?.currentEstimateHours);
  }, []);

  const updateEstimate = () => {
    isUpdatingEstimate(true);
    updateCurrentEstimate({ taskId: props?.id, estimate: currentEstimate })
      .then((response: any) => {
        isUpdatingEstimate(false);
        isDialogOpen(false);
        props?.onUpdateSuccess();
        console.log("response", response);
      })
      .catch((error) => {
        isUpdatingEstimate(false);
        // console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  if (!props.visible) return <></>;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleContent>
        <div className="w-full pt-2">
          {typeof props.remainingHours === "number" && (
            <p className="text-sm font-normal text-gray-700">
              Remaining Hours: {props.remainingHours}
            </p>
          )}

          {props.ganttEnabled && (
            <div className="flex flex-row w-full items-center py-1">
              <p className="flex-1 pr-2 text-xs text-gray-500">
                {props?.initialEstimateHours.toFixed(2)} Hrs (
                {(props?.initialEstimateHours / 8).toFixed(2)})
              </p>
              <div className="flex-[5] relative">
                <p className="flex-1 pr-2 text-xs text-gray-500">Gantt Estimate</p>
                <div
                  style={{
                    width: `${Math.min(
                      Math.ceil((props.initialEstimateHours / longestHour) * 100),
                      100
                    )}%`,
                  }}
                  className={cn("rounded-full bg-teal-500 grow h-4")}
                >
                  <div className="w-[100%] h-4 rounded-full bg-gray-300 absolute  -z-10" />
                </div>
              </div>
            </div>
          )}

          {props.ganttEnabled && (
            <div className="flex flex-row w-full items-center py-1">
              <p className="flex-1 pr-2 text-xs text-gray-500">
                {props?.currentEstimateHours.toFixed(2)} Hrs (
                {(props?.currentEstimateHours / 8).toFixed(2)})
              </p>
              <div className="flex-[5] relative">
              <p className="flex-1 pr-2 text-xs text-gray-500">Current Estimate</p>
                <div
                  style={{
                    width: `${Math.min(
                      Math.ceil(
                        (props?.currentEstimateHours / longestHour) * 100
                      ),
                      100
                    )}%`,
                  }}
                  className={cn(
                    "rounded-full h-4",
                    props?.currentEstimateHours > props.initialEstimateHours
                      ? "bg-red-500"
                      : "bg-green-500"
                  )}
                >
                  <div className="w-[100%] h-4 rounded-full bg-gray-300 absolute  -z-10" />
                  {!props?.isConsultation && (
                    <Dialog open={dialogOpen} onOpenChange={isDialogOpen}>
                      <DialogTrigger asChild>
                        <button className="absolute z-10 -right-3 top-[-1px] rounded-full bg-white p-1">
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
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Update current estimate</DialogTitle>
                          <DialogDescription>
                            Make changes to your current estimate here. Click save
                            when you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="estimate" className="text-start">
                              New Estimate
                            </Label>
                            <Input
                              id="estimate"
                              value={currentEstimate}
                              onChange={(e: any) => {
                                const re = /^[0-9\b]+$/;
                                if (e.target.value === '' || re.test(e.target.value)) {
                                  setCurrentEstimate(e.target.value)
                                }
                              }}
                              className="col-span-3"
                              inputMode="numeric"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          {updatingEstimate ? (
                            <ColorRing
                              visible={updatingEstimate}
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
                            <Button type="submit" onClick={updateEstimate}>
                              Save changes
                            </Button>
                          )}
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-row w-full items-center py-1">
            <p className="flex-1 pr-2 text-xs text-gray-500">
              {props.totalRenderedHours.toFixed(2)} Hrs (
              {(props.totalRenderedHours / 8).toFixed(2)})
            </p>
            <div className="flex-[5] relative">
              <p className="flex-1 pr-2 text-xs text-gray-500">Actual Rendered Hours</p>
              <div
                style={{
                  width: `${Math.min(
                    Math.ceil((props.totalRenderedHours / longestHour) * 100),
                    100
                  )}%`,
                }}
                className={cn(
                  "rounded-full h-4",
                  props.totalRenderedHours > props.initialEstimateHours
                    ? "bg-red-500"
                    : "bg-cyan-500"
                )}
              >
                <div className="w-[100%] h-4 rounded-full bg-gray-300 absolute -z-10" />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        <button className="w-full flex flex-row items-center justify-center pt-3 gap-2">
          <p className="font-medium text-sm text-slate-500">View More</p>
          {!isOpen ? (
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
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
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          )}
        </button>
      </CollapsibleTrigger>
    </Collapsible>
  );
}

export default Graph;
