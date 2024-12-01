import {Controller, Post, Req, UseGuards} from "@nestjs/common";

import type {Request} from "express";

import {SignInResponseDto,} from "@quentinpiot/dtos";

import {AuthService} from "@/auth/auth.service";
import {LocalEmailAuthGuard} from "@/auth/local-email-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(
        private service: AuthService,
    ) {
    }

    @Post()
    @UseGuards(LocalEmailAuthGuard)
    async login(@Req() req: Request): Promise<SignInResponseDto> {
        return this.service.login(req.user);
    }
}
