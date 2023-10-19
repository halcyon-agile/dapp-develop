import { useState, useEffect } from "react";
import {
  appWindow,
  PhysicalPosition,
  LogicalSize,
  currentMonitor,
} from "@tauri-apps/api/window";

function useWindowDragAndMinimize() {
  const [minimal, setMinimal] = useState(false);

  const toggleMinimize = async () => {
    const monitor = await currentMonitor();
    await appWindow.innerSize();

    if (minimal) {
      await appWindow.setDecorations(true);
      appWindow.setSize(new LogicalSize(650, 500)).then(async () => {
        setMinimal(false);
        await appWindow.center();
        await appWindow.setAlwaysOnTop(false);
      });
    } else {
      const newWidth = 200;
      await appWindow.setDecorations(false);
      appWindow.setSize(new LogicalSize(newWidth, 100)).then(async () => {
        setMinimal(true);
        await appWindow.setPosition(
          new PhysicalPosition(
            monitor ? monitor.size.width - newWidth * 2 : 0,
            0
          )
        );

        await appWindow.setAlwaysOnTop(true);
      });
    }
  };

  useEffect(() => {
    if (minimal) {
      const startDrag = async () => {
        await appWindow.startDragging();
      };
      window.addEventListener("mousedown", startDrag);

      return () => {
        window.removeEventListener("mousedown", startDrag);
      };
    }
  }, [minimal]);

  return { minimal, toggleMinimize };
}

export default useWindowDragAndMinimize;
