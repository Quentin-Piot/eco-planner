import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

enum TransportationType {
  PRIVATE_TRANSPORT = "PRIVATE_TRANSPORT",
  PUBLIC_TRANSPORT = "PUBLIC_TRANSPORT"
}

export class Journey {
  @IsString()
  @IsNotEmpty()
  from: string;
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsEnum(TransportationType, { each: true })
  @IsNotEmpty()
  transportationType: TransportationType;

}

export class GetJourneysDetailsDto {

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsNotEmpty()
  @Type(() => Journey)
  journeys: Journey[];

}