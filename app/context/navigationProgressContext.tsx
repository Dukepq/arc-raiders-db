"use client";
import { useContext, createContext, useState, useEffect } from "react";
import cn from "../utils/cn";

type NavigationState = "complete" | "in-progress" | "initial" | "completing";
type Progress = {
  navigationState: NavigationState;
  done: () => void;
  start: () => void;
  reset: () => void;
};
const ProgressBarContext = createContext<Progress | null>(null);

export function ProgressBar({ children }: { children: React.ReactNode }) {
  const progressActions = useProgress();
  const { navigationState } = progressActions;

  let progress: number;
  if (navigationState === "in-progress") {
    progress = 75;
  } else if (navigationState === "completing") {
    progress = 100;
  } else {
    progress = 0;
  }

  return (
    <ProgressBarContext.Provider value={progressActions}>
      {
        <div className="h-0.5 fixed w-full z-[1000]">
          <div
            className={cn(
              "absolute transition-transform ease-out duration-1000 scale-0 origin-left h-full w-full top-0 left-0 block bg-accent",
              navigationState === "completing" &&
                "animate-fadeOut duration-300",
              (navigationState === "initial" ||
                navigationState === "complete") &&
                "duration-0 opacity-0"
            )}
            aria-hidden="true"
            style={{ transform: `scaleX(${progress}%)` }}
          ></div>
        </div>
      }
      {children}
    </ProgressBarContext.Provider>
  );
}

export function useProgress() {
  const [navigationState, setNavigationState] =
    useState<NavigationState>("initial");

  useEffect(() => {
    if (navigationState === "completing") {
      setTimeout(() => {
        setNavigationState("complete");
      }, 600);
    }
  }, [navigationState]);

  function reset() {
    setNavigationState("initial");
  }

  function start() {
    setNavigationState("in-progress");
  }

  function done() {
    setNavigationState((prev) =>
      prev === "initial" || prev === "in-progress" ? "completing" : prev
    );
  }

  return { reset, start, done, navigationState };
}

export function useNavigationProgressContext() {
  const ctx = useContext(ProgressBarContext);
  if (!ctx) {
    throw new Error("context can only be used inside of a context provider!");
  }
  return ctx;
}
