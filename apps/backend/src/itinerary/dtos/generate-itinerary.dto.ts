import {
  GenerateItineraryBody,
  TransportationType,
  TravelPreference,
} from "@quentinpiot/shared";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from "class-validator";

export class GenerateItineraryDto implements GenerateItineraryBody {
  @IsString()
  @IsNotEmpty()
  startingPlace: string;

  @IsInt()
  @IsPositive()
  @Min(2)
  @Max(14)
  @IsNotEmpty()
  totalNumberOfDays: number;

  @IsString()
  @IsOptional()
  mandatoryStage?: string;

  @IsEnum(TravelPreference, { each: true })
  @IsNotEmpty()
  travelPreferences: TravelPreference[];

  @IsEnum(TransportationType)
  @IsNotEmpty()
  transportationType: TransportationType;
}

export class ItineraryResponse {
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
