import {IsEmail, IsPhoneNumber, IsString, MinLength} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(8)
    @ApiProperty()
    password: string;

    @IsPhoneNumber()
    @IsString()
    @ApiProperty()
    phoneNumber: string;
}


export class CreateUserResponse {
    id:string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}