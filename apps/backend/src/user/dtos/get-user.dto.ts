import { IsEmail, IsOptional, IsString, IsUUID, ValidateIf } from "class-validator";

export class GetUserByEmailOrByNameDto {

  @IsOptional()
  @IsEmail()
  @ValidateIf(req => req.email || !req.phoneNumber)
  email?: string;
  @IsString()
  @ValidateIf(req => !req.email || req.phoneNumber)
  phoneNumber?: string;
}

export class GetUserByIdDto {

  @IsUUID()
  id: string;
}


export class GetUserResponse {
  id: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}


export class GetMeResponse extends GetUserResponse {
}
