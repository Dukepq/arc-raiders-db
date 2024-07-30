"use client";

import map from "@/public/blank.png";
import InteractiveMap from "./InteractiveMap";
import { Evac, AlertArea, Location } from "@/app/maps/_components/Markers";
import { MAP_WIDTH } from "@/app/config/constants";

const markers = [
  <Evac x={300} y={150} key={1} />,
  <Location x={60} y={30} key={4} color="white">
    Hangar
  </Location>,
];

export default function MapDisplay() {
  const mapHeight = Math.round((MAP_WIDTH / map.width) * map.height);

  return (
    <div className="relative">
      {/* <div className="w-80 h-[calc(100vh-50px)] bg-primary-mild bg-opacity-100 fixed z-30"></div> */}
      <InteractiveMap
        map={map}
        mapWidth={MAP_WIDTH}
        mapHeight={mapHeight}
        markers={markers}
      />
    </div>
  );
}
