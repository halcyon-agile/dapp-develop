import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import useStore from "../../store";
import loginUser from "../../api/loginUser";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { AxiosError } from "axios";
import { LogIn } from "lucide-react";
import useActiveTasks from "../../data/use-active-tasks";
import { TaskTime } from "../../types";

function LoginScreen() {
  const navigate = useNavigate();
  const [setUser] = useStore((state) => [state.setUser]);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email:
      import.meta.env.VITE_MODE === "DEV"
        ? "system.administrator@halcyon-pms-web.test"
        : "",
    password: "",
  });
  const [attempting, attemptingLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [secure, setSecure] = useState<boolean>(true);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const { data: activeTasks, refetch: refetchActiveTasks } = useActiveTasks();
  const hasActiveTask = activeTasks
    ? activeTasks.some((t: TaskTime) => t?.task?.timer_on === 0)
    : false;

  useEffect(() => {
    setErrorMessage("");
  }, [form]);

  const attemptLogin = async (e: any) => {
    attemptingLogin(true);
    e.preventDefault();
    try {
      const user = await loginUser(form.email, form.password);
      setUser(user);
      refetchActiveTasks().then(() => {
        // console.log(hasActiveTask)
        if (hasActiveTask) {
          navigate("/");
        } else {
          navigate("/select-task");
          attemptingLogin(false);
        }
      });
    } catch (error: AxiosError | any) {
      console.log("error", error);
      attemptingLogin(false);
      setErrorMessage(
        error?.response?.data?.message || "Something went wrong."
      );
    }
  };
  return (
    <main className="flex flex-1 flex-col items-center justify-center text-black min-h-screen gap-2 p-14">
      <div className="items-center justify-center font-mono text-sm px-10 flex flex-row">
        <img src={logo} style={{ height: 25, width: 75 }} alt="Logo" />
        <div className="left-0 top-0 w-full justify-center text-4xl flex-1 font-bold flex flex-row ml-4">
          <p className="text-blue-600">HARP</p>
          {/* <p className="text-sky-400">PMS</p> */}
        </div>
      </div>
      <div
        className={`bg-red-500 text-white text-center p-2 rounded-md w-full h-10 ${
          errorMessage ? "visible" : "invisible"
        }`}
      >
        {errorMessage}
      </div>
      <form
        className="flex flex-col bg-white w-full text-white items-center justify-center max-w-lg gap-4"
        onSubmit={attemptLogin}
      >
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="email"
            className="text-black font-medium text-sm self-start"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            className="text-black p-1 rounded-md border px-3 font-normal text-base w-full mt-1.5"
            autoCapitalize="none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="password"
            className="text-black font-medium text-sm self-start"
          >
            Password
          </Label>
          <div className={`flex flex-row w-full items-center justify-between mt-1.5 gap-1 rounded-md border pr-3 overflow-hidden ${passwordFocused ? "outline-none ring-2 ring-ring ring-offset-2" : ""}`}>
            {/* <Input
              type={secure ? "password" : "text"}
              id="password"
              className="text-black p-1 font-normal text-base w-full border-white focus:border-white"
              autoCapitalize="none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
            /> */}
            <input
              type={secure ? "password" : "text"}
              id="password"
              autoCapitalize="none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
              className="flex h-10 w-full text-black p-1 font-normal text-base rounded-md bg-transparent px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <button
              type="button"
              onClick={() => setSecure(!secure)}
            >
              {secure ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>              
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000000" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </button>
            {/* {secure ? (
              <Button type="button" onClick={() => setSecure(false)}>View</Button>
            ) : (
              <Button type="button" onClick={() => setSecure(true)}>Hide</Button>
            )} */}
          </div>
        </div>
        {attempting ? (
          <ColorRing
            visible={attempting}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          // <Button
          <button
            className="bg-sky-400 py-2 px-5 rounded-md font-medium flex flex-row gap-3 items-center self-end"
            type="submit"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>
        )}
      </form>
    </main>
  );
}

export default LoginScreen;
