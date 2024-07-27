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
  let progress = navigationState === "in-progress" ? 75 : 0;
  if (navigationState === "completing") progress = 100;
  return (
    <ProgressBarContext.Provider value={progressActions}>
      {navigationState !== "complete" && (
        <div className="h-0.5 absolute w-full z-[1000]">
          <div
            className={cn(
              "absolute transition-all ease-out duration-150 scale-0 origin-left h-full w-full top-0 left-0 block bg-accent",
              navigationState === "completing" && "animate-fadeOut"
            )}
            aria-hidden="true"
            style={{ transform: `scaleX(${progress}%)` }}
          ></div>
        </div>
      )}
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
      }, 500);
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
