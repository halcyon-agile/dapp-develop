import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Terminal } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui";
import getConsultations from "../api/consultations/consultations";
import useStore from "../store";
import getConsultationInvites from "../api/consultations/consultationInvites";
import { ConsultationItem } from "../components/custom";

function Consultations() {
  const navigate = useNavigate();
  const [fetching, isFetching] = useState<boolean>(false);
  const [user, consultations, setConsultations] = useStore((state) => [
    state.user,
    state.consultations,
    state.setConsultations,
  ]);
  useEffect(() => {
    isFetching(true);
    getConsultations().then((list) => {
      setConsultations(list);
      isFetching(false);
    });
  }, []);

  console.log('consultations', consultations)

  return (
    <main className="flex min-h-screen flex-col p-5">
      <div className="left-0 top-0 w-full text-4xl py-2">
        <p className="font-semibold text-xl">Consult</p>
      </div>
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid grid-cols-2 w-[50%]">
          <TabsTrigger
            value="requests"
            onClick={() => {
              isFetching(true);
              setConsultations([]);
              getConsultations().then((list) => {
                setConsultations(list);
                isFetching(false);
              });
            }}
          >
            From you
          </TabsTrigger>
          <TabsTrigger
            value="invites"
            onClick={() => {
              isFetching(true);
              setConsultations([]);
              getConsultationInvites().then((list) => {
                setConsultations(list);
                isFetching(false);
              });
            }}
          >
            From others
          </TabsTrigger>
        </TabsList>
        <TabsContent value="requests">
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
          ) : consultations?.length > 0 ? (
            consultations.map((data) => (
              <ConsultationItem
                data={data}
                name={user?.first_name}
                tab="requests"
                key={data?.id}
              />
            ))
          ) : (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You have no consultation requests right now.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
        <TabsContent value="invites">
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
          ) : consultations?.length > 0 ? (
            consultations.map((data) => (
              <ConsultationItem
                data={data}
                name={user?.first_name}
                tab="invites"
                key={data?.id}
                isFromOthers
              />
            ))
          ) : (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You have no consultation invites right now.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
      <div className="w-full items-end flex flex-row justify-end gap-4 mt-4">
        <Button
          variant="ghost"
          className="border border-slate-200"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        {/* <Button
          className="bg-cyan-500"
          onClick={() => navigate("/create-consultation")}
        >
          Add Consult
        </Button> */}
      </div>
    </main>
  );
}

export default Consultations;
