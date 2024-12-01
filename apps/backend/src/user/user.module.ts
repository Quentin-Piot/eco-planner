import {Module} from "@nestjs/common";
import {AuthModule} from "@/auth/auth.module";
import {UserController} from "@/user/user.controller";
import {UserService} from './user.service';
import {CqrsModule} from "@nestjs/cqrs";
import {PrismaModule} from "@/prisma/prisma.module";

@Module({
    imports: [
        AuthModule,
        CqrsModule,
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {
}
