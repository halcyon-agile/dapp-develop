import { useState } from "react"

import { useNavigate } from "react-router-dom"

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui"

interface Props {
  reddot: boolean
}

function ConsultDialog(props: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false)
  const [option, setOption] = useState<"view" | "log" | string>("")
  return (
    <Dialog
      open={open}
      onOpenChange={(openDialog: boolean) => {
        setOpen(openDialog)
        if (!openDialog) {
          setOption("")
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          className="flex flex-col items-center relative"
          // onClick={() => navigate("/consultations")}
        >
          <div
            className={`absolute rounded-full bg-red-500 top-0 right-1 w-2 h-2 ${
              props?.reddot ? "" : "hidden"
            }`}
          ></div>

          <div className="rounded-full border border-slate-200 p-2 mb-2">
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
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-xs text-gray-500">Consult</p>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="border-b pb-4">Consult</DialogTitle>
        </DialogHeader>
        <button
          className="py-4 flex flex-row items-center justify-between border-b mt-[-12px]"
          onClick={() => setOption("view")}
        >
          <p className={`text-sm ${option === "view" ? "text-blue-500" : "text-slate-700"}`}>View Consultations</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={option === "view" ? "#3B82F6" : "#334155"}
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button
          className="py-4 flex flex-row items-center justify-between border-b mt-[-12px]"
          onClick={() => setOption("log")}
        >
          <p className={`text-sm ${option === "log" ? "text-blue-500" : "text-slate-700"}`}>Log a Consult</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={option === "log" ? "#3B82F6" : "#334155"}
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <DialogFooter className="gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false)
              setOption("")
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-cyan-500"
            disabled={option === ""}
            onClick={() => {
              if (option === "view") {
                return navigate("/consultations")
              }
              return navigate("/select-task-for-consultation")
            }}
          >
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConsultDialog;
