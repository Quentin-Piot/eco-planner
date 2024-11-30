import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { join } from "path";

import { AuthController } from "@/auth/auth.controller";
import { AuthModule } from "@/auth/auth.module";
import { AuthService } from "@/auth/auth.service";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { LocalEmailStrategy } from "@/auth/local-email.strategy";
import { LocalPhoneStrategy } from "@/auth/local-phone.strategy";
import { UserController } from "@/user/user.controller";
import { UserService } from './user.service';
import {CqrsModule} from "@nestjs/cqrs";

@Module({
  imports: [
    AuthModule,
    CqrsModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
