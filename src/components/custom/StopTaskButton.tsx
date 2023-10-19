import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from '../ui';
import { ColorRing } from 'react-loader-spinner';
import updateCurrentEstimate from '../../api/updateCurrentEstimate';

interface Props {
  id: number;
  currentEstimate: number;
  stopTask: () => void;
  isRequiredToUpdateEstimate: boolean;
  isRequiredByTime: boolean;
}

function StopTaskButton(props: Props) {
  const [dialogOpen, isDialogOpen] = useState<boolean>(false)
  const [currentEstimate, setCurrentEstimate] = useState<number>(0);
  const [updatingEstimate, isUpdatingEstimate] = useState<boolean>(false);

  useEffect(() => {
    setCurrentEstimate(props?.currentEstimate);
  }, []);

  const updateEstimate = () => {
    isUpdatingEstimate(true);
    updateCurrentEstimate({ taskId: props?.id, estimate: currentEstimate, requiredByTime: props?.isRequiredByTime ?? false })
      .then((response: any) => {
        isUpdatingEstimate(false);
        isDialogOpen(false);
        // change to props?.stopTask();
        // props?.onUpdateSuccess();
        props?.stopTask();
        console.log("response", response);
      })
      .catch((error) => {
        isUpdatingEstimate(false);
        // console.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  if (!props?.isRequiredToUpdateEstimate) {
    return (
      <Button
          variant="outline"
          className={`font-medium text-xs ml-4`}
          onClick={props?.stopTask}
      >
        Stop
      </Button>
    )
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={isDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`font-medium text-xs ml-4`}
        >
          Stop
        </Button>
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
  )
}

export default StopTaskButton;
