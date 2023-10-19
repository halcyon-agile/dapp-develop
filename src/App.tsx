import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import useStore from "./store";
import router from "./lib/router";
import { Toaster } from "./components/ui/toaster";
import useUser from "./data/use-user";
import Updater from "./components/custom/Updater";
import useWindowDragAndMinimize from "./hooks/useWindowDragAndMinimize";
import { enable, isEnabled } from "tauri-plugin-autostart-api";

function App() {
  const [setUser] = useStore((state) => [state.setUser]);
  const { status, data, error } = useUser();
  const { minimal, toggleMinimize } = useWindowDragAndMinimize();

  const setStartup = async () => {
    if (!await isEnabled()) {
      await enable();
    }
  }

  useEffect(() => {
    setStartup();
  }, [])

  useEffect(() => {
    if (status === "error") {
      setUser(null);
      router.navigate("/login");
    }

    if (status === "success") {
      setUser(data);
    }
  }, [error, status, data, setUser]);

  return (
    <>
      <Updater />
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
