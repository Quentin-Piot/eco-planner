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

export enum Transport {
  "CAR" = "CAR",
  "BUS" = "BUS",
  "TRAIN" = "TRAIN",
  "BIKE" = "BIKE",
  "CARPOOL" = "CARPOOL",
}


export type GenerateItineraryBody = {
  startingPlace: string;
  totalNumberOfDays: number;
  mandatoryStage?: string;
  travelPreferences: TravelPreference[];
  transportationType: TransportationType;
}

export type Activity = {
  name: string
  description: string
  price: number
  carbonImpact: number
  address: string
}
export type JourneyStep = {
  from: string
  to: string
  duration: number
  distance: number
  waitingTime: number
  transportationType: Transport
  carbonImpact: number
}
export type Journey = {
  steps: JourneyStep[]
}

export type StageInformation = {
  city: string
  country: string
  numberOfDays: number
  activities: Activity[]
  journey: Journey
}

export type Itinerary = {
  totalBudget: number
  totalCarbonImpact: number
  stages: StageInformation[]
}

export type GenerateItinerariesResponse = {
  classicItinerary: Itinerary
  originalItinerary: Itinerary
}

