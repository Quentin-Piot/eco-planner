import {IsEmail, IsPhoneNumber, IsString, MinLength} from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsPhoneNumber()
    @IsString()
    phoneNumber: string;
}


export class CreateUserResponse {
    id:string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}