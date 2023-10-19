import { useEffect, useState } from "react";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";

export default function Updater() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isReadyForRelaunch, setIsReadyForRelaunch] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    await installUpdate();
    setIsReadyForRelaunch(true);
  };

  const handleRelaunch = async () => {
    await relaunch();
  };

  useEffect(() => {
    const check = async () => {
      const { shouldUpdate } = await checkUpdate();
      setShowUpdate(shouldUpdate);
    };

    const timer = setInterval(check, 10000); // Run check every 10 seconds

    return () => {
      clearInterval(timer); // Clean up the timer on component unmount
    };
  }, []);

  if (!showUpdate) {
    return null;
  }

  const updateText = isReadyForRelaunch
    ? "Update installed, relaunch now!"
    : "New update available!";

  return (
    <div className="fixed right-2 top-2 z-50">
      <div className="bg-white py-1 px-3 shadow-lg rounded-lg text-sm flex items-center">
        <div className="mr-2">{updateText}</div>
        {isReadyForRelaunch ? (
          <button
            className="text-gray-600 underline rounded bg-transparent"
            onClick={handleRelaunch}
          >
            Relaunch
          </button>
        ) : (
          <button
            className="text-gray-600 underline rounded bg-transparent"
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Install update"}
          </button>
        )}
      </div>
    </div>
  );
}
