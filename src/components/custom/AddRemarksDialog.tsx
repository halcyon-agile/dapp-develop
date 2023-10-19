import { useEffect, useState } from "react"
import { Textarea } from "../ui"
import { Button } from "../ui"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui"
import addRemarks from "../../api/addRemarks"
import { ColorRing } from "react-loader-spinner"

interface Props {
  id: number
  onSuccess: () => void
  remark: string
}

function AddRemarksDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<string>("")
  const [adding, addingRemarks] = useState<boolean>(false)

  useEffect(() => {
    setRemarks(props?.remark)
  }, [])

  const postRemark = () => {
    addingRemarks(true)
    addRemarks(props?.id, remarks)
      .then((response) => {
        if (response.status === 200) {
          addingRemarks(false)
          props?.onSuccess()
          setOpen(false)
        } else {
          addingRemarks(false)
        }
      })
      .catch((error) => {
        console.log("error", error)
        addingRemarks(false)
      })
  }
  return (
    <Dialog open={open} onOpenChange={(openDialog: boolean) => {
      setOpen(openDialog)
      if (!openDialog) {
        setRemarks(props?.remark)
      }
    }}>
      <DialogTrigger asChild>
        <button>
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
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="border-b pb-4">Remarks</DialogTitle>
        </DialogHeader>
        <Textarea
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
          autoFocus
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={adding}
            onClick={() => {
              postRemark()
            }}
          >
            {adding ? (
              <ColorRing
                visible={adding}
                height="24"
                width="24"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />
            ) : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddRemarksDialog;
