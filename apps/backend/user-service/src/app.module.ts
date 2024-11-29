import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { HealthModule, PrismaService } from "@quentinpiot/utils-microservices";

import { CheckPasswordCombinationHandler } from "@/queries/handlers/check-password-combination.handler";
import { CreateUserHandler } from "./commands/handlers/create-user.handler";
import { UserController } from "./infrastructure/grpc/user.controller";
import { UserRepository } from "./infrastructure/persistence/repositories/user.repository";
import { GetUserHandler } from "./queries/handlers/get-user.handler";

@Module({
  imports: [CqrsModule, HealthModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: "IUserRepository",
      useClass: UserRepository,
    },
    UserRepository,
    CreateUserHandler,
    GetUserHandler,
    CheckPasswordCombinationHandler,
  ],
})
export class AppModule {}
