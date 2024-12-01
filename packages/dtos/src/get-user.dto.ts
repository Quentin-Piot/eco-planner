import { IsEmail, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";

export class GetUserDto{

  @IsOptional()
  @IsEmail()
  @ValidateIf(req=>req.email || !req.phoneNumber )
  email?: string;
  @IsString()
  @ValidateIf(req=>!req.email || req.phoneNumber )
  phoneNumber?: string;
}


export class GetUserResponse {
  id:string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}


