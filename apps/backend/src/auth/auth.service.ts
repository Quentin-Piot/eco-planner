import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { CreateUserResponse } from "@/user/dtos/create-user.dto";
import {
  EmailPhoneNumberPasswordDto,
  LoginResponseDto,
} from "@/user/dtos/login.dto";
import { UserService } from "@/user/user.service";

@Injectable()
export class AuthService {
  private userService: UserService;

  constructor(private jwtService: JwtService) {}

  async validateUser(emailPhoneNumberPasswordDto: EmailPhoneNumberPasswordDto) {
    return await this.userService.checkPasswordCombination({
      password: emailPhoneNumberPasswordDto.password,
      email: emailPhoneNumberPasswordDto.email,
      phoneNumber: emailPhoneNumberPasswordDto.phoneNumber,
    });
  }

  async login(user: CreateUserResponse) {
    const payload = {
      username: user.email || user.phoneNumber,
      sub: user.id,
      isEmail: !!user.email,
    };
    const accessToken = this.jwtService.sign(payload);
    return new LoginResponseDto(accessToken);
  }
}
