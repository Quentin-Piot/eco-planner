import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { AuthModule } from "@/auth/auth.module";
import { UserController } from "@/user/user.controller";

import { UserService } from "./user.service";

@Module({
  imports: [AuthModule, CqrsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
