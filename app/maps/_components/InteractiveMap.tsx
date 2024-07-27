"use client";

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { throttle } from "../../utils/throttle";
import cn from "@/app/utils/cn";
import { Locate } from "lucide-react";
import Image, { StaticImageData } from "next/image";

type InteractiveMapProps = {
  map: StaticImageData;
  mapWidth: number;
  mapHeight: number;
  startingZoom?: number;
  maxZoom?: number;
  minZoom?: number;
  markers?: React.ReactNode[];
};

export default function InteractiveMap({
  map,
  mapWidth,
  mapHeight,
  markers,
  minZoom = 0.25,
  maxZoom = 4,
  startingZoom = 1,
}: InteractiveMapProps) {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const [mapPosition, setMapPosition] = useState({
    x: 0,
    y: 0,
    scale: startingZoom,
  });
  const eventControllerElement = useRef<HTMLDivElement>(null);
  const mousePrevRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    throttle((e: globalThis.MouseEvent) => {
      if (!mouseDown) return;

      const deltaX = e.clientX - mousePrevRef.current.x;
      const deltaY = e.clientY - mousePrevRef.current.y;

      setMapPosition((prev) => {
        const newX = prev.x + deltaX;
        const newY = prev.y + deltaY;
        return {
          ...prev,
          x: newX,
          y: newY,
        };
      });
      mousePrevRef.current = { x: e.clientX, y: e.clientY };
    }, 30),
    [mouseDown]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!mouseOver) return;

      const smoothingFactor = 12;
      const mouseXRelativeToScreenCenter = window.innerWidth / 2 - e.clientX;
      const mouseYRelativeToScreenCenter = window.innerHeight / 2 - e.clientY;

      setMapPosition((prev) => {
        let newScale: number;
        if (e.deltaY < 0) {
          newScale = Math.min(prev.scale * 1.1, maxZoom);
          if (newScale === maxZoom) return prev;

          const scalingFactor = newScale / prev.scale;
          const translateX =
            (prev.x + mouseXRelativeToScreenCenter / smoothingFactor) *
            scalingFactor;
          const translateY =
            (prev.y + mouseYRelativeToScreenCenter / smoothingFactor) *
            scalingFactor;
          return {
            ...prev,
            x: translateX,
            y: translateY,
            scale: newScale,
          };
        } else {
          newScale = Math.max(prev.scale * 0.9, minZoom);
          if (newScale === minZoom) return prev;

          const scalingFactor = newScale / prev.scale;
          const translateX =
            (prev.x - mouseXRelativeToScreenCenter / smoothingFactor) *
            scalingFactor;
          const translateY =
            (prev.y - mouseYRelativeToScreenCenter / smoothingFactor) *
            scalingFactor;
          return {
            ...prev,
            x: translateX,
            y: translateY,
            scale: newScale,
          };
        }
      });
    },
    [mouseOver, maxZoom, minZoom]
  );

  useEffect(() => {
    const ece = eventControllerElement.current;
    if (!ece) return;

    ece.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (ece) ece.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown]);

  return (
    <div
      ref={eventControllerElement}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={(e) => {
        setMouseDown(() => true);
        mousePrevRef.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseLeave={() => setMouseDown(() => false)}
      onMouseUp={() => setMouseDown(() => false)}
      className={cn(
        "select-none h-[calc(100vh-50px)] overflow-clip cursor-grab",
        mouseDown && "cursor-move"
      )}
    >
      <div
        data-role="interactive-wrapper"
        onWheel={handleWheel}
        onMouseMove={(e) => {
          if (!mouseOver) setMouseOver(true);
        }}
        onMouseOut={() => setMouseOver(false)}
        className="relative w-fit h-fit overflow-clip transition-transform duration-35 ease-linear mx-auto"
        style={{
          transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapPosition.scale})`,
          transformOrigin: "50% 50%",
        }}
      >
        <div data-role="marker-container" className="absolute w-full h-full">
          {!!markers && markers}
        </div>

        <Image
          priority={true}
          src={map}
          alt="map"
          style={{
            pointerEvents: "none",
            minWidth: mapWidth,
            maxWidth: mapWidth,
            width: mapWidth,
            height: mapHeight,
            minHeight: mapHeight,
            maxHeight: mapHeight,
          }}
          quality={90}
        />
      </div>
    </div>
  );
}
