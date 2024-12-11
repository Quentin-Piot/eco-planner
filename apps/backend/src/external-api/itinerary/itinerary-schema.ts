import { Schema, SchemaType } from "@google/generative-ai";

export const itinerarySchema: Schema = {
  type: SchemaType.OBJECT,
  description: "The generated eco-responsible itinerary",
  properties: {
    stages: {
      type: SchemaType.ARRAY,
      description:
        "The stages of the itinerary, each representing a city visit and its details",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          position: {
            type: SchemaType.INTEGER,
            description:
              "The position of the city in the trip : starting point is zero",
          },
          city: {
            type: SchemaType.STRING,
            description: "The name of the city for this stage",
          },
          country: {
            type: SchemaType.STRING,
            description: "The country where this city is located",
          },
          numberOfDays: {
            type: SchemaType.INTEGER,
            description: "The number of days planned for this stage",
          },
          dailyBudget: {
            type: SchemaType.OBJECT,
            description: "The daily budget for this stage in euros",
            properties: {
              accommodation: {
                type: SchemaType.OBJECT,
                description:
                  "The daily accomodation budget of this stage in euros",
                properties: {
                  minBudget: {
                    type: SchemaType.NUMBER,
                    description: "The daily budget for low cost accommodation",
                  },
                  maxBudget: {
                    type: SchemaType.NUMBER,
                    description: "The daily budget for mid cost accommodation",
                  },
                },
              },
              food: {
                type: SchemaType.OBJECT,
                description: "The daily food budget of this stage in euros",
                properties: {
                  minBudget: {
                    type: SchemaType.NUMBER,
                    description: "The daily budget for low cost food",
                  },
                  maxBudget: {
                    type: SchemaType.NUMBER,
                    description: "The daily budget for mid cost food",
                  },
                },
              },
            },
          },
          activities: {
            type: SchemaType.ARRAY,
            description: "Top 3 recommended activities to do in this city",
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: {
                  type: SchemaType.STRING,
                  description: "The name of the activity",
                },
                price: {
                  type: SchemaType.INTEGER,
                  description: "The approximate cost of the activity in euros",
                },
              },
            },
          },
          journey: {
            type: SchemaType.OBJECT,
            description: "Details of the journey to reach this stage",
            properties: {
              transportMode: {
                type: SchemaType.STRING,
                description:
                  "The primary mode of transport for this journey (e.g., 'BUS', 'TRAIN', 'CARPOOL', 'BIKE')",
              },
              distance: {
                type: SchemaType.NUMBER,
                description:
                  "The distance covered in this journey (in kilometers)",
              },
              duration: {
                type: SchemaType.NUMBER,
                description: "The estimated travel time (in hours)",
              },
              approximatePrice: {
                type: SchemaType.NUMBER,
                description: "The approximate cost of the journey in euros",
              },
              numberOfTransfers: {
                type: SchemaType.INTEGER,
                description:
                  "The number of transfers in the journey to reach the stage",
              },
              transfers: {
                type: SchemaType.ARRAY,
                description: "Details of each transfers during the journey",
                items: {
                  type: SchemaType.OBJECT,
                  properties: {
                    place: {
                      type: SchemaType.STRING,
                      description: "The location of this transfer",
                    },
                    transportMode: {
                      type: SchemaType.STRING,
                      description: "Mode of transport used for this transfer",
                    },
                    distance: {
                      type: SchemaType.NUMBER,
                      description:
                        "Distance covered in this transfer (in kilometers)",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    totalItineraryCarbonImpact: {
      type: SchemaType.NUMBER,
      description:
        "The total carbon footprint (in kg) for the entire itinerary",
    },
    estimatedCost: {
      type: SchemaType.NUMBER,
      description: "The estimated total cost of the itinerary (in euros)",
    },
  },
};

export const itineraryJson = `
{
  "realistic" : "number",
  "stages": [
    {
      "city": "string",
      "country": "string",
      "totalNumberOfDays": "number",
      "journey": {
        "transportMode": "string",
        "distance": "number",
        "duration": "number",
        "approximatePrice": "number",
        "numberOfTransfers": "number",
        "startingStation": "string",
        "endingStation": "string",
        "carbonImpact": "number",
        "transfers": [
          {
            "city": "string",
            "startingStation": "string",
            "endingStation": "string"
          }
        ]
      },
      "dailyBudget": {
        "accommodation": {
          "minBudget": "number",
          "maxBudget": "number"
        },
        "food": {
          "minBudget": "number",
          "maxBudget": "number"
        }
      },
      "activities": [
        {
          "name": "string",
          "description": "string",
          "price": "number"
        }
      ]
    }
  ]
}


`;
