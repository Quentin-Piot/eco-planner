import { Mistral } from "@mistralai/mistralai";
import {
  ResponseFormats,
  UserMessageRole,
} from "@mistralai/mistralai/models/components";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { shortPrompt } from "@/external-api/itinerary/itinerary-prompt";
import { GenerateItineraryDto } from "@/itinerary/dtos/generate-itinerary.dto";

@Injectable()
export class MistralApiService {
  private mistral: Mistral;

  constructor() {
    this.mistral = new Mistral({
      apiKey: process.env.MISTRAL_API_KEY,
    });
  }

  async generateItinerary(infos: GenerateItineraryDto) {
    try {
      const result = await this.mistral.agents.complete({
        agentId: "ag:87fe0e84:20241205:ecoplanner-itinerary:c9489af8",
        messages: [
          {
            content: shortPrompt(infos),
            role: UserMessageRole.User,
          },
        ],
        responseFormat: {
          type: ResponseFormats.JsonObject,
        },
      });

      const object = result.choices[0].message.content as string;
      return JSON.parse(object);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException({
        message: "Error with Mistral API",
      });
    }
  }
}
