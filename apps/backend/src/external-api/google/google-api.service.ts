import { Injectable } from "@nestjs/common";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { itinerarySchema } from "@/external-api/itinerary/itinerary-schema";
import { GenerateItineraryDto } from "@quentinpiot/dtos";
import { Client, TravelMode } from "@googlemaps/google-maps-services-js";
import { Journey } from "@quentinpiot/dtos/dist/itinerary/get-journeys-details.dto";



@Injectable()
export class GoogleApiService {

  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;
  private mapsClient: Client;
  private readonly mapsKey : string;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: { responseMimeType: "application/json", responseSchema: itinerarySchema },
    });
    this.mapsClient = new Client({});
    this.mapsKey = process.env.GOOGLE_MAPS_API_KEY
  }


  async generateItinerary(infos: GenerateItineraryDto) {

    const startingPlace = infos.startingPlace;
    const destination = infos.destination;
    const totalNumberOfDays = infos.totalNumberOfDays;
    const travelPreferences = infos.travelPreferences;

    const travelPreferencesString = travelPreferences.join(", ");


    const prompt = `Generate an eco-friendly and realistic travel itinerary in Europe based on the following criteria and user input:

    The trip starts at ${startingPlace}, passes through ${destination}, and ends back at ${startingPlace}
    The trip is always in the same country
    The trip must exclusively use trains, bullet trains, and buses (no flights, cars, or other private vehicles).
    All journeys must be real, documented connections with accurate schedules, transfer points, budgets, and durations.
    List each journey's transfer locations/places if it is not a direct journey by bus or train.
    The itinerary spans ${totalNumberOfDays} days, excluding time spent in the starting point and ending point city
    Focus on unique cities or towns for each stage, avoiding revisiting the same city unless unavoidable.
    Incorporate user preferences like ${travelPreferencesString}, but prioritize feasibility and real-world constraints. Ignore preferences that are unrealistic.
    For each city visited:
        Provide a realistic average cost range for accommodation.
        Give documented and realistic prices for activities
    We don't spend time or do any activity in the starting point and therefore ending point city

Answer with the language given in the input
`;
    const output = await this.model.generateContent(prompt);

    return output.response.text();
  }

  async getJourneysDetails(journeys : Journey[]): Promise<any> {

    return Promise.all(
      journeys.map(async (journey) => {
        const query : any = {
          origins: [journey.from],
          destinations: [journey.to],
          mode:journey.transportationType === "PRIVATE_TRANSPORT" ? TravelMode.driving : TravelMode.transit,
          key:this.mapsKey
        }
        const directions = await this.mapsClient.distancematrix({
          params:query
        })
        return directions.data
      })
    )



  }


}
