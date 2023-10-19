import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
} from "../components/ui";

import getScrums from "../api/getScrums";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrumItem } from "../components/custom";
import useStore from "../store";

function Scrum() {
  const navigate = useNavigate();
  const [fetching, isFetching] = useState<boolean>(false);

  useEffect(() => {
    isFetching(true);
    getScrums().then((list) => {
      setScrums(list);
      isFetching(false);
    });
  }, []);

  const [scrums, setScrums] = useStore((state) => [
    state.scrums,
    state.setScrums,
  ]);

  console.log(scrums)

  return (
    <main className="flex min-h-screen flex-col p-5">
      <div className="left-0 top-0 w-full text-4xl py-2">
        <p className="font-semibold text-xl">Scrum for today</p>
      </div>
      <div className="w-full flex flex-1 flex-col gap-4">
        {fetching ? (
          <ColorRing
            visible={fetching}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : scrums?.length > 0 ? (
          scrums.map((data) => <ScrumItem data={data} key={data?.id} />)
        ) : (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You have no scrums right now.</AlertDescription>
          </Alert>
        )}

        {/* <div className="w-full flex flex-col border rounded border-slate-200 p-4 gap-1">
          <p className="font-medium text-base text-gray-700">
            Project 2 - Consult
          </p>
          <p className="font-medium text-xs text-gray-500">
            {`<Time>`}
          </p>
          <p className="font-medium text-xs text-gray-500">
            from Christian
          </p>
          <div className="rounded-full px-4 py-1 bg-slate-100 w-[79px] max-w-[100px] mt-3.5 h-[24px]">
            <p className="font-medium text-xs text-center text-slate-900">
              Expired
            </p>
          </div>
        </div> */}

        <div className="w-full items-end flex flex-row justify-end gap-4 mt-4">
          <Button
            variant="ghost"
            className="border border-slate-200"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Scrum;
