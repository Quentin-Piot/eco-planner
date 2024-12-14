import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { CreateUserDto } from "@/user/dtos/create-user.dto";
import { UserService } from "@/user/user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get("/profile")
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() request: any) {
    const userInfos = request.user;
    return this.userService.getUserByEmailOrPhoneNumber({
      email: userInfos.email,
      phoneNumber: userInfos.phoneNumber,
    });
  }
}
