import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

import { CreateUserDto } from "@quentinpiot/dtos";
import { UserServiceController } from "@quentinpiot/protos/generated/user";

import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { GrpcToHttpInterceptor } from "@/interceptors/grpc-to-http.interceptor";
import {UserService} from "@/user/user.service";


@UseInterceptors(GrpcToHttpInterceptor)
@Controller("users")
export class UserController {

  constructor(private readonly userService:UserService) {}


  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get("/profile")
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() request: any) {
    const userInfos = request.user;
    return this.userService.getUser({
      email: userInfos.email,
      phoneNumber: userInfos.phoneNumber,
    });
  }
}
