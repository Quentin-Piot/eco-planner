import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

import {join} from "path";

import {JwtStrategy} from "@/auth/strategies/jwt.strategy";
import {LocalEmailStrategy} from "@/auth/strategies/local-email.strategy";
import {LocalPhoneStrategy} from "@/auth/strategies/local-phone.strategy";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: "5m"},
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, LocalEmailStrategy, AuthService, LocalPhoneStrategy],
    exports: [AuthService],
})
export class AuthModule {
}
