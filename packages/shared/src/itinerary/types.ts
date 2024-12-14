export enum TravelPreference {
  "CULTURE" = "CULTURE",
  "CITY" = "CITY",
  "BEACH" = "BEACH",
  "HIKING" = "HIKING",
}

export enum TransportationType {
  "PRIVATE_TRANSPORT" = "PRIVATE_TRANSPORT",
  "PUBLIC_TRANSPORT" = "PUBLIC_TRANSPORT",
}

export type GenerateItineraryBody = {
  startingPlace: string;
  totalNumberOfDays: number;
  mandatoryStage?: string;
  travelPreferences: TravelPreference[];
  transportationType: TransportationType;
}

export type ItineraryResponse = {
  stages: Array<{
    city: string;
    country: string;
    totalNumberOfDays: string;
    journey: {
      transportationType: string;
      price: string;
      duration: string;
    };
    dailyBudget: {
      accommodation: {
        minBudget: string;
        maxBudget: string;
      };
      food: {
        minBudget: string;
        maxBudget: string;
      };
    };
    activities: Array<{
      name: string;
      price: string;
    }>;
  }>;
}
