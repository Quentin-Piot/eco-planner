"use client";

import { useEffect, useState } from "react";
import { lazy, Suspense } from "react";

export const LeafletMap = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const LeafletMap = lazy(() => import("./leaflet-map.client"));

  if (!isClient) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <LeafletMap />
    </Suspense>
  );
};
