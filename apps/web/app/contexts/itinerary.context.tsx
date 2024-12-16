import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Itinerary } from "@quentinpiot/shared";
import Fuse from "fuse.js";
import Papa from "papaparse";

type City = { label: string; zip_code: string };

const capitalizeFirstLetter = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

const removeDuplicates = (items: City[]): City[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.label}-${item.zip_code}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

type ItineraryContextType = {
  classicItinerary: Itinerary | null;
  originalItinerary: Itinerary | null;
  setClassicItinerary: (itinerary: Itinerary) => void;
  setOriginalItinerary: (itinerary: Itinerary) => void;
  getCitiesFromSearchTerm: (searchTerm: string) => string[];
};

export const ItineraryContext = createContext<ItineraryContextType>({
  originalItinerary: null,
  classicItinerary: null,
  setClassicItinerary: () => null,
  setOriginalItinerary: () => null,
  getCitiesFromSearchTerm: () => [],
});

export const ItineraryProvider = ({ children }: PropsWithChildren) => {
  const [classicItinerary, setClassicItinerary] = useState<Itinerary | null>(
    null,
  );
  const [originalItinerary, setOriginalItinerary] = useState<Itinerary | null>(
    null,
  );

  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (cities.length > 0) return;
    const fetchCities = async () => {
      const response = await fetch("/french_cities_labels.csv");
      const csvText = await response.text();
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });
      const data = parsed.data as City[];
      const uniqueCities = removeDuplicates(data);
      setCities(uniqueCities);
    };

    void fetchCities();
  }, [cities]);

  const fuse = useMemo(() => {
    return new Fuse(cities, { threshold: 0.3, keys: ["label", "zip_code"] });
  }, [cities]);

  const getCitiesFromSearchTerm = (searchTerm: string) => {
    const results = fuse.search(searchTerm, { limit: 5 });

    return results
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .map((result) =>
        capitalizeFirstLetter(`${result.item.label}, ${result.item.zip_code}`),
      );
  };

  return (
    <ItineraryContext.Provider
      value={{
        classicItinerary,
        originalItinerary,
        setClassicItinerary,
        setOriginalItinerary,
        getCitiesFromSearchTerm,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};
