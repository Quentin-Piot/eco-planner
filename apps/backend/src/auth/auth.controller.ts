import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { LoginResponseDto } from "@quentinpiot/dtos";
import type { Request } from "express";

import { AuthService } from "@/auth/auth.service";
import { LocalEmailAuthGuard } from "@/auth/guards/local-email-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post()
  @UseGuards(LocalEmailAuthGuard)
  async login(@Req() req: Request): Promise<LoginResponseDto> {
    return this.service.login(req.user);
  }
}
