export const shortPrompt = (infos: any) => {
  return `Generate me an itinerary according to the instructions system prompt and the following parameters : ${JSON.stringify(infos, null, 2)}`;
};

  const longPrompt = `
  Generate an eco-friendly itinerary in France, starting and ending in the same city 'startingPlace' as a circuit. 
  - The number of days to spend on each city should be realistic according to travel guides and 'totalNumberOfDays' travelling. Minimum 2.
  - The number of days spend in starting city should be 0. The number of days spend in ending city at the end of circuit should be 1.
  - No activity, budget and journey in starting city.
  - Only journey for ending city.
  
  - The 'mandatoryStage' (only if not null), should be included inside the itinerary no matter the itinerary.
  - If 'transportationType' is PUBLIC_TRANSPORT, itinerary should be only using bus, train, or bullet-train.
  - If 'transportationType' is PRIVATE_TRANSPORT, itinerary should be only using car.
    
  1. Activities:
      * Provide 3 activities per stage, try to align with the given 'travelPreferences' if possible
      * Find a balance between most famous activities and original ones. If possible a workshop according to the city
      * Avoid giving several times the same kind of workshop
      * Double-check the current cost for each activity, including entry fees, guided tours, food, and any other relevant expenses.
     
  2. Costs:
      * Include costs for accommodation (if applicable), food, and any other relevant expenses.
      * For journeys, give the estimated price for cumulated tickets (if transfers) in case of PUBLIC_TRANSPORT and the cumulated price of gas and tolls for PRIVATE_TRANSPORT.
  
  3. Journeys
      * Give the estimated price for cumulated tickets (if transfers) in case of PUBLIC_TRANSPORT and the cumulated price of gas and tolls for PRIVATE_TRANSPORT.
      * We want realistic journeys, avoid big distances in one day as much as possible
  
      
  4. Language:
      * Ensure the itinerary is provided in the preferred language.
      
  5. Units
      * Duration in hours
      * Prices in euros
  
  The itinerary should be realistic according to the transportation type and only in France.
  
  The output should follow the rules in the following json :
  
  {
  "stages": [
    {
      "city": "string",
      "country": "string",
      "totalNumberOfDays": "number",
      "journey" : {
        "transportationType": "string",
        "price": "number",
        "duration": "number"
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
          "price": "number"
        }
      ]
    }
  ]
}`;