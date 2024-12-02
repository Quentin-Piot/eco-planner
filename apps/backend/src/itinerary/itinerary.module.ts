import { Module } from "@nestjs/common";
import { ItineraryController } from "./itinerary.controller";
import { ItineraryService } from "./itinerary.service";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [ItineraryController],
  providers: [ItineraryService],
})
export class ItineraryModule {
}
