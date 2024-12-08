import { Module } from "@nestjs/common";
import { ItineraryController } from "./itinerary.controller";
import { ItineraryService } from "./itinerary.service";
import { CqrsModule } from "@nestjs/cqrs";
import { ExternalApiModule } from "@/external-api/external-api.module";

@Module({
  imports: [
    CqrsModule,
    ExternalApiModule
  ],
  controllers: [ItineraryController],
  providers: [ItineraryService],
})
export class ItineraryModule {
}
