import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";

import { AuthService } from "@/auth/auth.service";
import { LocalEmailAuthGuard } from "@/auth/guards/local-email-auth.guard";
import { LoginResponseDto } from "@/user/dtos/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post()
  @UseGuards(LocalEmailAuthGuard)
  async login(@Req() req: Request): Promise<LoginResponseDto> {
    return this.service.login(req.user);
  }
}
