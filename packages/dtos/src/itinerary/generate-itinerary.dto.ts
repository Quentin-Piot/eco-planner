import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum TravelPreference {
  "CULTURE" = "CULTURE",
  "CITY" = "CITY",
  "BEACH" = "BEACH",
  "HIKING" = "HIKING",
}

export class GenerateItineraryDto {

  @IsString()
  @IsNotEmpty()
  startingPlace: string;

  @IsInt()
  @IsPositive()
  @Min(2)
  @Max(14)
  @ApiProperty()
  @IsNotEmpty()
  totalNumberOfDays: number;


  @IsString()
  @IsOptional()
  destination: string;

  @IsEnum(TravelPreference, { each: true })
  @IsNotEmpty()
  travelPreferences: TravelPreference[];

}