import { IsEmail, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";

export class EmailPhoneNumberPasswordDto{

  @IsOptional()
  @IsEmail()
  @ValidateIf(req=>req.email || !req.phoneNumber )
  email?: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @ValidateIf(req=>!req.email || req.phoneNumber )
  phoneNumber?: string;
}


export class SignInResponseDto {

  constructor(accessToken:string) {
    this.accessToken = accessToken;
  }

  @IsString()
  accessToken: string;
}


