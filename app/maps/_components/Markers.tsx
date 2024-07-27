import { LogOut, ArrowDownToDot } from "lucide-react";
import { forwardRef } from "react";
import * as TT from "@radix-ui/react-tooltip";

type POIProps = { x: number; y: number };

type EvacPOIProps = {} & POIProps;

export function Evac({ x, y }: EvacPOIProps) {
  const content = (
    <>
      <div className="w-full h-full absolute top-0 right-0">
        <div className="absolute bg-accent size-3 -top-1.5 -right-1.5 animate-ping rounded-full duration-300"></div>
      </div>
      <h4 className="text-lg">Evacuation point</h4>
      <p className="text-sm">Go here to evacuate back to basecamp.</p>
    </>
  );
  return (
    <TTBase content={content}>
      <TT.Trigger asChild>
        <POIPositionWrap x={x} y={y}>
          <LogOut size={38} />
          <span className="opacity-65">ELEVATOR</span>
        </POIPositionWrap>
      </TT.Trigger>
    </TTBase>
  );
}

type LocationProps = { children: React.ReactNode; color: string } & POIProps;
export function Location({ x, y, color, children }: LocationProps) {
  return (
    <div
      className="absolute z-10 flex items-center flex-col cursor-pointer"
      style={{
        transform: `translate3d(${x}px, ${y}px, 0px)`,
        transformOrigin: "50% 50%",
      }}
    >
      <ArrowDownToDot color={color} size={38} />
      <span className="font-semibold">{children}</span>
    </div>
  );
}

type AlertAreaProps = {
  size: number;
  renderInside?: React.ReactNode;
  color?: string;
} & POIProps;
export function AlertArea({
  size,
  x,
  y,
  renderInside,
  color = "red",
}: AlertAreaProps) {
  return (
    <div
      style={{
        transform: `translate3d(${x - size / 2}px, ${y - size / 2}px, 0px)`,
      }}
      className="relative w-min h-min"
    >
      <div
        style={
          color
            ? { width: size, height: size, backgroundColor: color }
            : { width: size, height: size }
        }
        className={`opacity-50 rounded-full`}
      ></div>
      {renderInside && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap">
          {renderInside}
        </div>
      )}
    </div>
  );
}

type POIPositionWrapProps = {
  children: React.ReactNode;
  x: number;
  y: number;
  iconSize?: number;
} & React.AllHTMLAttributes<HTMLDivElement>;

const POIPositionWrap = forwardRef<HTMLDivElement, POIPositionWrapProps>(
  ({ children, x, y, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className="absolute z-10 flex items-center flex-col cursor-pointer overflow-hidden"
        style={{
          transform: `translate3d(${x}px, ${y}px, 0px)`,
          transformOrigin: "50% 50%",
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

function TTBase({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <TT.Provider delayDuration={300} skipDelayDuration={0}>
      <TT.Root>
        {children}
        <TT.Portal>
          <TT.Content
            align="center"
            side="top"
            className="bg-backdrop rounded-sm p-2 overflow-hidden"
          >
            {content}
            <TT.Arrow fill="rgb(15 9 18)" />
          </TT.Content>
        </TT.Portal>
      </TT.Root>
    </TT.Provider>
  );
}
