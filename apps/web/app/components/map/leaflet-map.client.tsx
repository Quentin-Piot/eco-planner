"use client";

import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";

import { Box } from "@chakra-ui/react";

import FranceGeoJSON from "@/assets/regions-geo.json";
const LeafletMapClient = () => {
  return (
    <>
      <Box width={"100%"} height={"500px"}>
        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={[46.232192999999995, 2.209666999999996]}
          zoom={5.4}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          dragging={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <GeoJSON
            data={FranceGeoJSON as any}
            onEachFeature={(feature, layer) => {
              layer.on({
                click: () => {
                  console.log("feature", feature);
                  alert(`${feature.properties.nom}`);
                },
              });
            }}
            style={() => ({ color: "#4a83ec", weight: 1 })}
          />
        </MapContainer>
      </Box>
    </>
  );
};

export default LeafletMapClient;
