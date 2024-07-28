"use client";

import cn from "@/app/utils/cn";
import * as Tabs from "@radix-ui/react-tabs";
import { Suspense, useState } from "react";
import Spinner from "./Spinner";

type TabPanelsProps = {
  panels: { panelName: string; panelContent: React.ReactNode }[];
};
export default function TabPanels({ panels }: TabPanelsProps) {
  const [currentTab, setCurrentTab] = useState<string>(panels[0].panelName);
  return (
    <Tabs.Root
      defaultValue={panels[0].panelName}
      onValueChange={(value) => setCurrentTab(value)}
    >
      <Tabs.List className="p-3 ">
        {panels.map((panel) => {
          const { panelName } = panel;
          return (
            <Tabs.Trigger
              className={cn(
                "mr-3 px-3 py-1 rounded-sm text-text bg-text bg-opacity-5 transition-colors",
                currentTab === panelName && "text-text bg-opacity-10"
              )}
              key={panelName}
              value={panelName}
            >
              {panelName}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      <hr className="mx-3 mb-3 opacity-10 text-text" />

      {panels.map((panel) => {
        const { panelName, panelContent } = panel;
        return (
          <Suspense
            key={panelName}
            fallback={
              <div className="w-full flex justify-center">
                <Spinner loading={true} />
              </div>
            }
          >
            <Tabs.Content value={panelName}>{panelContent}</Tabs.Content>
          </Suspense>
        );
      })}
    </Tabs.Root>
  );
}
