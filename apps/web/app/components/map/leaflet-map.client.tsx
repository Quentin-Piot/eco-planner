"use client";

import { useMemo, useState } from "react";
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";

import { Box } from "@chakra-ui/react";

export type LeafletMapClientProps = {
  gjson?: any;
  onFeatureSelect?: (feature: string) => void;
  selectedFeature?: string;
  isInvalid?: boolean;
};

const LeafletMapClient = ({
  gjson,
  selectedFeature,
  onFeatureSelect = () => null,
  isInvalid = false,
}: LeafletMapClientProps) => {
  const memoizedGeoJSON = useMemo(() => gjson, [gjson]);

  return (
    <>
      <Box
        width={"100%"}
        height={"500px"}
        borderRadius="0.25rem"
        borderColor={isInvalid ? "border.error" : undefined}
        borderWidth={1}
      >
        <MapContainer
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "0.25rem",
          }}
          center={[46.232192999999995, 2.209666999999996]}
          zoom={5.4}
          scrollWheelZoom={false}
          zoomControl={false}
          dragging={false}
          doubleClickZoom={false}
          attributionControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {gjson && (
            <GeoJSON
              key={selectedFeature}
              data={memoizedGeoJSON}
              style={() => ({ color: "#cccccc", weight: 1 })}
              onEachFeature={(feature, layer: any) => {
                const defaultStyle = { color: "#cccccc", weight: 1 };
                const hoverStyle = { color: "#8c8c8c", weight: 2 };
                const activeStyle = { color: "#90c5aa", weight: 3 };

                if (feature.properties.nom !== selectedFeature) {
                  layer.setStyle(defaultStyle);
                } else {
                  layer.setStyle(activeStyle);
                }

                layer.on({
                  mouseover: () => {
                    if (feature.properties.nom !== selectedFeature) {
                      layer.setStyle(hoverStyle);
                    }
                  },
                  mouseout: () => {
                    if (feature.properties.nom !== selectedFeature) {
                      layer.setStyle(defaultStyle);
                    }
                  },
                  click: () => {
                    layer._map.eachLayer((mapLayer: any) => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
                      if (mapLayer instanceof L.GeoJSON) {
                        mapLayer.eachLayer((geoLayer: any) => {
                          geoLayer.setStyle(defaultStyle);
                        });
                      }
                    });

                    layer.setStyle(activeStyle);
                    onFeatureSelect(feature.properties.nom);
                  },
                });
              }}
            />
          )}
        </MapContainer>
      </Box>
    </>
  );
};

export default LeafletMapClient;
