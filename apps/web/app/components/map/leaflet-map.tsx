"use client";

import { PropsWithChildren, Suspense, useEffect, useState } from "react";

import LeafletMapClient, {
  LeafletMapClientProps,
} from "@/components/map/leaflet-map.client";

const Wrapper = ({ children }: PropsWithChildren) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};
export const LeafletMap = (props: LeafletMapClientProps) => {
  return (
    <Suspense fallback={<div>Chargement</div>}>
      <Wrapper>
        <LeafletMapClient {...props} />
      </Wrapper>
    </Suspense>
  );
};
