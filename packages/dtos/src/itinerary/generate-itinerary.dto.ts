import { IsInt, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GenerateItineraryDto {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  numberOfDays: number;
}