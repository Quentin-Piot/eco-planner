import {Body, Controller, Get, Post, Req, UseGuards, UseInterceptors,} from "@nestjs/common";

import {CreateUserDto} from "@quentinpiot/dtos";

import {JwtAuthGuard} from "@/auth/jwt-auth.guard";
import {UserService} from "@/user/user.service";


@Controller("users")
export class UserController {

    constructor(private readonly userService: UserService) {
    }


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
