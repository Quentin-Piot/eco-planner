"use client";

import { Suspense, useEffect, useState } from "react";

import LeafletMapClient, {
  LeafletMapClientProps,
} from "@/components/map/leaflet-map.client";

export const LeafletMap = (props: LeafletMapClientProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <LeafletMapClient {...props} />
    </Suspense>
  );
};
